/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import EntryScreen from './components/EntryScreen';
import Room from './components/Room';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="w-full h-screen overflow-hidden bg-[#fdf2f8] text-slate-800 font-sans selection:bg-pink-200">
      <AnimatePresence mode="wait">
        {!entered ? (
          <EntryScreen key="entry" onEnter={() => setEntered(true)} />
        ) : (
          <ErrorBoundary key="room">
            <Room />
          </ErrorBoundary>
        )}
      </AnimatePresence>
    </div>
  );
}
