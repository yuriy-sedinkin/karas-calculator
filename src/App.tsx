import React, { useCallback, useEffect, useState } from 'react';

import { CalcResults, calculateAll, getAllMultipliers } from './calculate';
import karas from './karas.svg';
import './App.css';
import Form from './Form';
import AllWithTabs from './Results/AllWithTabs';
import memoImg from './memo.jpg';
import HintPopup from './Results/HintPopup';
import { getAllLS, setLS } from './lib/localStorage';
import Footer from './Footer';

export type Multipliers = { [key: string]: number | '' };

function App() {
  const [gainedPoints, setGainedPoints] = useState<number | ''>('');
  const [targetPoints, setTargetPoints] = useState<number | ''>('');
  const [multipliers, setMultipliers] = useState<Multipliers>({});
  const [adBonus, setAdBonus] = useState<number | ''>('');

  const [calcResults, setCalcResults] = useState<CalcResults>([]);

  const calculateResults = useCallback(() => {
    if (targetPoints === '') return;
    const multipliersArray = Object.values(multipliers);
    if (multipliersArray.length === 0) return;
    const filteredMultipliers = multipliersArray.filter(multiplier => multiplier !== '');

    const allMultipliers = getAllMultipliers(filteredMultipliers as number[], adBonus || 0);
    const calculated = calculateAll(allMultipliers, gainedPoints || 0, targetPoints);
    setCalcResults(calculated);
  }, [adBonus, multipliers, gainedPoints, targetPoints]);

  useEffect(() => {
    const savedValues = getAllLS();
    if (savedValues['multipliers']) {
      setMultipliers(savedValues['multipliers'])
    }
    if (savedValues['adBonus']) {
      setAdBonus(savedValues['adBonus'])
    }
    if (savedValues['gainedPoints']) {
      setGainedPoints(savedValues['gainedPoints'])
    }
    if (savedValues['targetPoints']) {
      setTargetPoints(savedValues['targetPoints'])
    }
  }, []);

  // TODO make useLocalStorageCb
  return (
    <div className="App">
      <header className="App-header">
        <img src={karas} className="App-logo" alt="logo" />
      </header>

      <Form
        multipliers={multipliers}
        onMultipliersChange={(value: Multipliers) => { setMultipliers(value); setLS({ multipliers: value }) }}

        gainedPoints={gainedPoints}
        onGainedPointsChange={(value: number) => { setGainedPoints(value); setLS({ gainedPoints: value }) }}

        targetPoints={targetPoints}
        onTargetPointsChange={(value: number) => { setTargetPoints(value); setLS({ targetPoints: value }) }}

        adBonus={adBonus}
        onAdBonusChange={(value: number) => { setAdBonus(value); setLS({ adBonus: value }) }}
      />
      <div>
        <a href={memoImg} target="_blank" className="App__memo-link" rel="noopener noreferrer">Памятка</a>
      </div>
      <button
        className="App__submit"
        onClick={() => calculateResults()}
      >
        Рассчитать
      </button>

      <AllWithTabs
        results={calcResults}
      />
      <HintPopup />
      <Footer />
    </div>
  );
}

export default App;
