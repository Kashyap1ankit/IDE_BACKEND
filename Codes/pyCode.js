    import { fileURLToPath } from 'url';
    import { exec } from 'child_process';
    import path from 'path';
    import compiler from 'compilex';
    import fs from 'fs/promises';

    const currentModulePath = fileURLToPath(import.meta.url);
    const currentModuleDir = path.dirname(currentModulePath);

    const runPythonCode = async (code) => {
        try {
          const fullPath = path.resolve(currentModuleDir, 'python_script.py');
          await fs.writeFile(fullPath, code);
      
          return new Promise((resolve, reject) => {
      
                const pythonCommand = `python "${fullPath}"`;
                console.log('Executing Python Command:', pythonCommand);
      
                const child = exec(pythonCommand, (error, stdout, stderr) => {
                  console.log('Python Execution Output:', { stdout, stderr });  
      
                  if (error) {
                    console.error('Python Execution Error:', error);
                    resolve({ consoleOutput: error.message ? error.message.trim() : '' });
                  } else {
                    resolve({ consoleOutput: stdout.trim() });
                  }
                });
             

          });
        } catch (error) {
          console.error(`Error writing Python code to file: ${error}`);
          throw new Error(`Error writing Python code to file: ${error}`);
        }
      };
      
    export default runPythonCode;
