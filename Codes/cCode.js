import compiler from 'compilex';
import { exec } from 'child_process';
import path from 'path';

// Initialize compilex
const options = { stats: true };
compiler.init(options, { OS: 'windows', cmd: 'gcc' });

// Example language (C)
const lang = 'C';

// Define the current module directory
const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

// Function to compile C code
const compileCCode = (code) => {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(currentModuleDir, 'C:\\Users\\praja\\OneDrive\\Desktop\\projects\\IDE\\IDE_BACKEND\\temp\\2x05bvf.cpp'); // Specify the full path

        compiler.compileCPP({ OS: 'windows', cmd: 'gcc' }, code, (compileData) => {
            console.log(compileData);
            if (compileData.code === 0) {
                resolve();
            } else {
                reject(compileData);
            }
        }, { outputFileName: fullPath });
    });
};

// Function to run the compiled program
const runCompiledProgram = () => {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(currentModuleDir, 'hello_world');

        const child = exec(fullPath, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(`Execution failed with error: ${error}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

// Function to compile and run C code
const compileAndRunCCode = async (code) => {
    try {
        await compileCCode(code);
        const result = await runCompiledProgram();
        console.log('Compilation and execution successful.');
        return result;
    } catch (error) {
        console.error('Error compiling or running C code:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
};

export default compileAndRunCCode;
