  import React, { useRef, useState, useEffect } from 'react';
  import { Upload, Eraser, PenTool, X } from 'lucide-react';

  interface TTDUploadProps {
    onUpdate: (dataUrl: string | null) => void;
    initialValue: string | null;
  }

  const TTDUpload: React.FC<TTDUploadProps> = ({ onUpdate, initialValue }) => {
    const [mode, setMode] = useState<'draw' | 'upload'>('draw');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    
    // Setup canvas context
    useEffect(() => {
      if (mode === 'draw' && canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 3; // Sedikit lebih tebal agar jelas
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          
          // Clear background
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }
    }, [mode]);

    // Helper untuk mendapatkan koordinat yang akurat (memperhitungkan scaling CSS vs resolusi Canvas)
    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };

      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let clientX, clientY;

      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);
      
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDrawing) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { x, y } = getCoordinates(e);

      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const endDrawing = () => {
      if (isDrawing) {
        setIsDrawing(false);
        const canvas = canvasRef.current;
        if (canvas) {
          onUpdate(canvas.toDataURL('image/png'));
        }
      }
    };

    const clearCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          onUpdate(null);
        }
      }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          onUpdate(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    const removeUploaded = () => {
        onUpdate(null);
    };

    return (
      <div className="space-y-3">
        <div className="flex space-x-2 text-sm">
          <button
            type="button"
            onClick={() => setMode('draw')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-2 border ${
              mode === 'draw' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <PenTool size={16} /> Gambar TTD
          </button>
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center gap-2 border ${
              mode === 'upload' ? 'bg-primary text-white border-primary' : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            <Upload size={16} /> Upload Gambar
          </button>
        </div>

        {mode === 'draw' ? (
          <div className="border border-gray-300 rounded-md bg-white relative">
            <canvas
              ref={canvasRef}
              width={500}
              height={200}
              className="w-full h-40 touch-none cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={endDrawing}
              onMouseLeave={endDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={endDrawing}
            />
            <button
              type="button"
              onClick={clearCanvas}
              className="absolute top-2 right-2 p-1 bg-white shadow rounded-full text-red-500 hover:text-red-600 border border-gray-200"
              title="Hapus / Reset"
            >
              <Eraser size={16} />
            </button>
          </div>
        ) : (
          <div className="relative">
            {initialValue ? (
               <div className="border border-gray-300 rounded-md p-4 bg-white flex flex-col items-center relative group">
                  <img src={initialValue} alt="TTD Uploaded" className="h-32 object-contain" />
                  <button 
                    onClick={removeUploaded}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full shadow-md transition"
                    title="Hapus Gambar"
                  >
                    <X size={16} />
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Gambar tanda tangan saat ini</p>
               </div>
            ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:bg-gray-50 transition">
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="ttd-upload"
                    />
                    <label htmlFor="ttd-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-600">Klik untuk upload tanda tangan</span>
                    <span className="text-xs text-gray-400 mt-1">PNG/JPG (Transparan lebih baik)</span>
                    </label>
                </div>
            )}
          </div>
        )}
      </div>
    );
  };

  export default TTDUpload;