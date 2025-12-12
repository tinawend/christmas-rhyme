import { useState } from 'react';
import { generateRhyme } from './utils/gemini';
import { Gift, Sparkles, Snowflake, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [gift, setGift] = useState('');
  const [tone, setTone] = useState('Rolig');
  const [rhyme, setRhyme] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!gift) {
      setError('Vad döljer sig i paketet?');
      return;
    }
    setError('');
    setLoading(true);
    setRhyme('');

    try {
      const generatedRhyme = await generateRhyme(gift, tone);
      setRhyme(generatedRhyme);
    } catch (err: any) {
      setError(err.message || 'Något gick fel.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-sky-50 text-slate-800 flex items-center justify-center p-4 overflow-hidden relative font-sans">

      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Snowflakes - darker for visibility on light bg or white on sky parts */}
        {[...Array(50)].map((_, i) => (
          <div
            key={`snow-${i}`}
            className="absolute animate-fall text-sky-200"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Snowflake size={Math.random() * 20 + 10} />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full relative z-10"
      >
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 relative overflow-hidden">

          {/* Decorative Header Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 via-green-500 to-red-500" />

          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-full bg-red-50 mb-4">
              <Gift size={48} className="text-red-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-christmas font-bold text-slate-900 mb-2">
              Julrimsmaskinen
            </h1>
            <p className="text-slate-500 text-lg">
              Få hjälp med julklappsrimmen på sekunder
            </p>
          </div>

          <div className="space-y-6 flex flex-col items-center">
            <div className="w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Vad innehåller paketet?</label>
              <div className="relative">
                <input
                  type="text"
                  value={gift}
                  onChange={(e) => setGift(e.target.value)}
                  placeholder="T.ex. Stickade vantar"
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-red-500 focus:bg-white text-slate-900 placeholder-slate-400 focus:outline-none transition-all duration-200 text-lg"
                />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Önskad Ton</label>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-slate-200 focus:border-red-500 focus:bg-white text-slate-900 focus:outline-none transition-all duration-200 text-lg appearance-none cursor-pointer"
                >
                  <option value="Rolig">😄 Rolig & Skämtsam</option>
                  <option value="Hjärtlig">❤️ Hjärtlig & Varm</option>
                  <option value="Grov">😈 Lite Fräck</option>
                  <option value="Gammaldags">📜 Gammaldags & Högtidlig</option>
                  <option value="Mystisk">🕵️ Mystisk & Klurig</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 text-red-600 px-6 py-3 rounded-xl text-sm text-center border border-red-100 w-full"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-200 transform transition-all duration-200 flex items-center justify-center gap-3 text-lg mt-2"
            >
              {loading ? (
                <Sparkles className="animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  <span>Skapa Julrim</span>
                </>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {rhyme && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-10 pt-8 border-t border-slate-100"
              >
                <div className="bg-green-50 p-8 rounded-2xl border border-green-100 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-green-100 text-green-600 text-xs font-bold uppercase tracking-wider">
                    Ditt Rim
                  </div>
                  <p className="whitespace-pre-wrap font-serif text-xl leading-relaxed text-slate-800 text-center italic">
                    {rhyme}
                  </p>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={() => navigator.clipboard.writeText(rhyme)}
                      className="text-xs font-bold text-green-700 hover:text-green-900 uppercase tracking-widest hover:underline"
                    >
                      Kopiera
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <p className="text-center text-slate-400 text-xs mt-8">
          Powered by Google Gemini
        </p>
      </motion.div>
    </div>
  );
}

export default App;
