
export default function runCode(code) {
  return new Promise((resolve, reject) => {
    try {
      const result = eval(code);
      resolve(result);
    } catch (error) {
      reject(error.toString());
    }
  });
}