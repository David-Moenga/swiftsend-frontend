import { Link } from 'react-router-dom';
import { ArrowUpRight, Globe2, ShieldCheck } from 'lucide-react';

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-12">
      <div className="grid gap-10 md:grid-cols-[1.3fr_.7fr_.7fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-2.5" aria-label="SwiftSend home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0f766e]">
              <span className="relative block h-4 w-5">
                <i aria-hidden="true" className="absolute left-0 top-1 block h-1.5 w-4 rounded-full bg-white" />
                <i aria-hidden="true" className="absolute right-0 top-4 block h-1.5 w-5 rounded-full bg-[#9ff4dc]" />
              </span>
            </span>
            <span className="text-lg font-bold tracking-[-0.04em] text-slate-950 dark:text-white">SwiftSend</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Move money across borders with clear rates, thoughtful tools, and less waiting.</p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e7faf3] px-2.5 py-1.5 text-[#087869] dark:bg-[#173b3b] dark:text-[#9ff4dc]"><ShieldCheck size={13} /> Secure by design</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5 dark:bg-slate-800"><Globe2 size={13} /> Built for borders</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Explore</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/send">Send money</Link></li>
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/receive">Receive money</Link></li>
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/rates">Exchange rates</Link></li>
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/track">Track a transfer</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Support</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/help">Help centre</Link></li>
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/login">Log in</Link></li>
            <li><Link className="transition hover:text-[#087869] dark:hover:text-[#9ff4dc]" to="/register">Create account</Link></li>
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-6 text-xs text-slate-400 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} SwiftSend. All rights reserved.</p>
        <Link to="/help" className="inline-flex items-center gap-1 font-semibold transition hover:text-[#087869] dark:hover:text-[#9ff4dc]">Need a hand? Visit help <ArrowUpRight size={13} /></Link>
      </div>
    </div>
  </footer>
);

export default Footer;
