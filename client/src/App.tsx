import { useEffect, useState } from "react";
import { api } from "./lib/api";

interface HealthResponse {
  status: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const data = await api.get<HealthResponse>("/health");
        setHealth(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-indigo-600 p-6 text-center">
          <h1 className="text-2xl font-bold text-white">PERN Template</h1>
          <p className="text-indigo-100 mt-2">Production Ready Starter</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              System Status
            </h2>
            
            <div className={`p-4 rounded-lg border ${
              error ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Backend API</span>
                {loading ? (
                  <span className="text-gray-500 animate-pulse">Connecting...</span>
                ) : error ? (
                  <span className="text-red-600 font-bold">Offline</span>
                ) : (
                  <span className="text-green-600 font-bold">Online</span>
                )}
              </div>
              
              {health && (
                <div className="mt-2 text-xs text-gray-500 font-mono">
                  Timestamp: {health.timestamp}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Quick Links
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="https://react.dev" 
                target="_blank" 
                className="flex items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                React Docs
              </a>
              <a 
                href="https://expressjs.com" 
                target="_blank" 
                className="flex items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Express Docs
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 text-center text-xs text-gray-400">
          Edit <code className="font-mono text-gray-600">client/src/App.tsx</code> to get started
        </div>
      </div>
    </div>
  );
}

export default App;
