interface NumericStats {
  average: number;
  max: number;
  min: number;
}

interface TextStats {
  averageLength: number;
  mostCommonWord: string;
}

type ExtendsData = TextStats | NumericStats

interface DataAnalyzerResult<T> {
  data: T[];
  stats: ExtendsData
}


function calculateNumericStats(data: number[]): NumericStats {
  if (data.length === 0) {
    throw new Error('El conjunto de datos numéricos está vacío.');
  }

  const average = data.reduce((sum, value) => sum + value, 0) / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);

  return { average, max, min };
}

function calculateTextStats(data: string[]): TextStats {
  if (data.length === 0) {
    throw new Error('El conjunto de datos de texto está vacío.');
  }

  const wordCount = data.reduce((count, word) => {
    count[word] = (count[word] || 0) + 1;
    return count;
  }, {} as Record<string, number>);

  const mostCommonWord = Object.entries(wordCount).reduce(
    ([_, maxCount], [word, count]) =>
      count > maxCount ? [word, count] : [_, maxCount],
    ['', 0]
  )[0];

  const averageLength = data.reduce((sum, word) => sum + word.length, 0) / data.length;

  return { averageLength, mostCommonWord };
}


const selectionTupleCalculate: [
  (data: number[]) => NumericStats,
  (data: string[]) => TextStats
] = [calculateNumericStats, calculateTextStats];

function dataAnalyzer<T>(data: T[]): DataAnalyzerResult<T> {
  if (!data || data.length === 0) {
    throw new Error('El conjunto de datos está vacío.');
  }

  const [numericAnalyzer, textAnalyzer] = selectionTupleCalculate;
  let stats: ExtendsData
  switch (typeof data[0]) {
    case 'number':
      stats = numericAnalyzer(data as number[]);
      break;
    case 'string':
      stats = textAnalyzer(data as string[]);
      break;
    default:
      throw new Error('Tipo de datos no soportado.');
  }
  return {
    data,
    stats,
  };
}

const numericData = [1, 2, 3, 4, 5];
const textData = ['hola', 'mundo', 'typescript', 'es', 'genial'];

const numericResult = dataAnalyzer(numericData);
const textResult = dataAnalyzer(textData);
console.log(numericResult);
console.log(textResult);
//? out
/**
{
  data: [ 1, 2, 3, 4, 5 ],
  stats: {
    average: 3,
    max: 5,
    min: 1,
  },
}
{
  data: [ "hola", "mundo", "typescript", "es", "genial" ],
  stats: {
    averageLength: 5.4,
    mostCommonWord: "hola",
  },
}
 */
