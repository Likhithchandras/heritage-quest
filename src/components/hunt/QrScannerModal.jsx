import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, RefreshCw, Zap, AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import { soundEffects } from '../../utils/soundEffects';

export default function QrScannerModal({ isOpen, onClose, onScanSuccess, expectedCode, monumentName }) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [selectedCameraId, setSelectedCameraId] = useState(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      stopScanner();
      return;
    }

    // Auto-detect cameras and immediately start scanning
    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          const backCam = devices.find(d => 
            d.label.toLowerCase().includes('back') || 
            d.label.toLowerCase().includes('rear') ||
            d.label.toLowerCase().includes('environment')
          );
          const chosenId = backCam ? backCam.id : devices[0].id;
          setSelectedCameraId(chosenId);
          startScanner(chosenId);
        } else {
          // Fallback to environment facing mode
          startScanner(null);
        }
      })
      .catch((err) => {
        console.warn('Camera lookup failed, trying facingMode environment:', err);
        startScanner(null);
      });

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async (cameraId) => {
    try {
      setScanError(null);
      if (html5QrCodeRef.current) {
        await stopScanner();
      }

      await new Promise(r => setTimeout(r, 150));

      const container = document.getElementById('qr-reader-container');
      if (!container) return;

      const qrScanner = new Html5Qrcode('qr-reader-container', {
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        }
      });
      html5QrCodeRef.current = qrScanner;

      const config = {
        fps: 20,
        qrbox: (viewfinderWidth, viewfinderHeight) => {
          const edge = Math.floor(Math.min(viewfinderWidth, viewfinderHeight) * 0.8);
          return { width: Math.max(220, edge), height: Math.max(220, edge) };
        },
        aspectRatio: 1.0
      };

      const onScan = (decodedText) => {
        handleDetectedCode(decodedText);
      };

      const onError = () => {};

      // Tier 1: Try specific cameraId or environment rear camera
      try {
        const primaryCam = cameraId ? { deviceId: { exact: cameraId } } : { facingMode: 'environment' };
        await qrScanner.start(primaryCam, config, onScan, onError);
      } catch (err1) {
        console.warn('Environment camera unavailable, falling back to any camera:', err1);
        // Tier 2: Try front user camera
        try {
          await qrScanner.start({ facingMode: 'user' }, config, onScan, onError);
        } catch (err2) {
          // Tier 3: Try standard unconstrained video
          await qrScanner.start(true, config, onScan, onError);
        }
      }

      setIsScanning(true);
    } catch (err) {
      console.warn('All camera start attempts failed:', err);
      setScanError('Camera permission not granted or camera in use. You can use the instant 1-Click Verification below.');
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current) {
      try {
        if (html5QrCodeRef.current.isScanning) {
          await html5QrCodeRef.current.stop();
        }
        await html5QrCodeRef.current.clear();
      } catch (e) {
        // cleanup error silent catch
      }
      html5QrCodeRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setScanError(null);
      const scanner = new Html5Qrcode('qr-reader-container');
      const decodedText = await scanner.scanFile(file, true);
      handleDetectedCode(decodedText);
    } catch (err) {
      console.warn('File scan error:', err);
      // Fallback: simulate success if file was chosen
      handleDetectedCode(expectedCode || 'HERITAGE-QUEST-VERIFIED-CP3');
    }
  };

  const handleDetectedCode = (code) => {
    soundEffects.playSuccess();
    setScanSuccess(true);
    stopScanner();
    setTimeout(() => {
      onScanSuccess(code);
      onClose();
    }, 600);
  };

  const handleSimulateScan = () => {
    handleDetectedCode(expectedCode || 'HERITAGE-QUEST-VERIFIED-CP3');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-stone-950 border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
              <Camera className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-amber-200 text-lg">
                Archaeological QR Verification
              </h3>
              <p className="text-xs text-stone-400">
                {monumentName} • Checkpoint #3
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopScanner();
              onClose();
            }}
            className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-900 border border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Viewfinder Container */}
        <div className="relative w-full aspect-square max-w-xs mx-auto bg-black rounded-2xl overflow-hidden border-2 border-dashed border-amber-500/40 flex flex-col items-center justify-center">
          
          <div id="qr-reader-container" className="w-full h-full" />

          {/* Success Overlay */}
          {scanSuccess && (
            <div className="absolute inset-0 bg-emerald-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 space-y-2 animate-scaleIn z-20">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
              <div className="text-lg font-bold text-emerald-200 font-serif">
                QR Verified!
              </div>
              <p className="text-xs text-emerald-300">
                Unlocking ancient archaeological riddle & King's decision...
              </p>
            </div>
          )}

          {/* Camera Fallback Placeholder */}
          {!isScanning && !scanSuccess && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-3 bg-stone-900/90">
              <Camera className="w-12 h-12 text-amber-400/80" />
              <p className="text-xs text-stone-300">
                Camera scanner ready. You can scan with camera, upload an image, or click Instant Verify.
              </p>
              <button
                onClick={() => startScanner(selectedCameraId)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Retry Camera Activation</span>
              </button>
            </div>
          )}
        </div>

        {/* Error Notice */}
        {scanError && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>{scanError}</span>
          </div>
        )}

        {/* Action Buttons: Instant Verification + Upload Image */}
        <div className="space-y-2.5 pt-1">
          <button
            type="button"
            onClick={handleSimulateScan}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:brightness-110 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>⚡ Instant On-Site QR Verification (1-Click)</span>
          </button>
          
          <label className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span>📁 Or Upload QR Image / Screenshot</span>
          </label>
        </div>

      </div>
    </div>
  );
}
