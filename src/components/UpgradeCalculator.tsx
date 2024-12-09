import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface MonthData {
  month: string;
  value: string;
  percentage: number;
}

export default function UpgradeCalculator() {
  const [firstMonth, setFirstMonth] = useState<MonthData>({ month: '', value: '', percentage: 0 });
  const [secondMonth, setSecondMonth] = useState<MonthData>({ month: '', value: '', percentage: 0 });
  const [futureMonth, setFutureMonth] = useState<string>('');
  const [averageUpgrade, setAverageUpgrade] = useState<number>(0);

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  useEffect(() => {
    if (firstMonth.month && secondMonth.month) {
      const firstIndex = months.indexOf(firstMonth.month);
      const secondIndex = months.indexOf(secondMonth.month);
      const futureIndex = (secondIndex + 1) % 12;
      setFutureMonth(months[futureIndex]);
    }
  }, [firstMonth.month, secondMonth.month]);

  const calculatePercentage = (currentValue: number, previousValue: number): number => {
    // Média 1 = ((valorMes2 / valorMes1) - 1) * 100
    return ((currentValue / previousValue - 1) * 100);
  };

  const calculateAverageUpgrade = (firstPercentage: number, secondPercentage: number): number => {
    // Média de UPGRADE = (media1 + media2) / 2
    return (firstPercentage + secondPercentage) / 2;
  };

  const formatCurrency = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Converte para número com duas casas decimais
    const formattedValue = (parseInt(numericValue) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return formattedValue;
  };

  const handleValueChange = (type: 'first' | 'second', value: string) => {
    // Remove formatação para cálculos
    const numericValue = value.replace(/[^\d]/g, '');
    const formattedValue = formatCurrency(value);

    if (type === 'first') {
      setFirstMonth({
        ...firstMonth,
        value: formattedValue,
        percentage: 0
      });
    } else {
      // Calcula a porcentagem (Média 1)
      const percentage = calculatePercentage(
        parseFloat(numericValue) / 100, 
        parseFloat(firstMonth.value.replace(/[^\d]/g, '')) / 100
      );
      
      // Calcula o upgrade se o segundo valor já foi preenchido
      const upgradePercentage = firstMonth.value ? 
        calculateAverageUpgrade(percentage, calculatePercentage(
          parseFloat(numericValue) / 100, 
          parseFloat(firstMonth.value.replace(/[^\d]/g, '')) / 100
        )) : 0;

      setSecondMonth({
        ...secondMonth,
        value: formattedValue,
        percentage
      });

      // Atualiza o upgrade
      setAverageUpgrade(upgradePercentage);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-xl font-semibold">Calculadora de Upgrade</h2>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Mês</h3>
          <select
            className="w-full p-2 border rounded-md"
            value={firstMonth.month}
            onChange={(e) => setFirstMonth({ ...firstMonth, month: e.target.value })}
          >
            <option value="">Selecione o primeiro mês</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <select
            className="w-full p-2 border rounded-md"
            value={secondMonth.month}
            onChange={(e) => setSecondMonth({ ...secondMonth, month: e.target.value })}
          >
            <option value="">Selecione o segundo mês</option>
            {months.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>

          <div className="p-2 border rounded-md bg-gray-50">
            {futureMonth || 'Mês futuro'}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Valor (R$)</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={firstMonth.value}
            onChange={(e) => handleValueChange('first', e.target.value)}
            placeholder="0.00"
          />

          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={secondMonth.value}
            onChange={(e) => handleValueChange('second', e.target.value)}
            placeholder="0.00"
          />

          <div className="p-2 border rounded-md bg-gray-50">
            {averageUpgrade ? `R$ ${(parseFloat(secondMonth.value.replace(/[^\d]/g, '')) / 100 * (1 + averageUpgrade / 100)).toFixed(2)}` : '-'}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 text-center">Indicadores de Upgrade</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium text-blue-800">Média 1</span>
              <span className="font-bold text-blue-600">
                {secondMonth.percentage ? secondMonth.percentage.toFixed(2) : '-'}%
              </span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              Crescimento do primeiro para o segundo mês
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-medium text-green-800">Média 2</span>
              <span className="font-bold text-green-600">
                {secondMonth.percentage ? (secondMonth.percentage * 1.1).toFixed(2) : '-'}%
              </span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Estimativa de crescimento com 10% de incremento
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-md font-semibold">
            <div className="flex justify-between items-center">
              <span className="font-medium text-purple-800">Média de Upgrade</span>
              <span className="font-bold text-purple-600">
                {averageUpgrade.toFixed(2)}%
              </span>
            </div>
            <p className="text-xs text-purple-700 mt-1">
              Média entre variação inicial e projeção de crescimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}