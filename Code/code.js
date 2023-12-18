import { VM } from 'vm2';
import { Writable } from 'stream';

export default async function runCode(code) {
  try {
    let consoleOutput = '';

    // Create a writable stream to capture the console output
    const consoleStream = new Writable({
      write: (chunk, encoding, callback) => {
        consoleOutput += chunk.toString();
        callback();
      },
    });

    // Create a new VM instance with console set to 'inherit' and a timeout of 5 seconds
    const vm = new VM({
      console: 'inherit', // Inherit the console
      timeout: 100*1000,      
      sandbox: {
        // Override the console to redirect it to the custom stream
        console: {
          log: (...args) => {
            consoleStream.write(args.map((arg) => String(arg)).join(' ') + '\n');
          },
        },
      },
    });

    // Run the provided code in the sandbox
    vm.run(code);

    // Close the console stream
    consoleStream.end();

    // Return the result along with the captured console output
    return { result: undefined, consoleOutput };
  } catch (error) {
    // If an error occurs during execution, throw the error message
    throw error.toString();
  }
}
