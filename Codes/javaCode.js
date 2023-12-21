import { exec } from 'child_process';
import path from 'path';
import compiler from 'compilex';

// Initialize compilex
const options = { stats: true };
compiler.init(options, { OS: 'windows' }); // You can also specify 'linux' for Linux support

// Define the current module directory
const currentModuleDir = path.dirname(new URL(import.meta.url).pathname);

// Function to compile Java code
const compileJavaCode = (code) => {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(currentModuleDir, 'Main.java'); // Specify the full path

        compiler.compileJava({}, code, (compileData) => {
            console.log(compileData);
            if (compileData.code === 0) {
                resolve(fullPath);
            } else {
                reject(compileData);
            }
        }, { outputFileName: fullPath });
    });
};

// Function to run the compiled Java program
const runCompiledJavaProgram = (compiledFilePath) => {
    return new Promise((resolve, reject) => {
        const javaCommand = `java -cp ${path.dirname(compiledFilePath)} Main`;

        const child = exec(javaCommand, (error, stdout, stderr) => {
            if (error) {
                console.error(stderr);
                reject(`Execution failed with error: ${error}`);
            } else {
                resolve(stdout);
            }
        });
    });
};
// Function to compile and run Java code
const compileAndRunJavaCode = async (code) => {
    try {
        const compiledFilePath = await compileJavaCode(code);
        const result = await runCompiledJavaProgram(compiledFilePath);
        console.log('Compilation and execution successful.');
        return result;
    } catch (error) {
        console.error('Error compiling or running Java code:', error);
        throw error; // Re-throw the error for the calling function to handle
    }
};

export default compileAndRunJavaCode;
