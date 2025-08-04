#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Be Brave Nails Development Environment...\n');

// Function to run npm commands
function runNpmCommand(command, cwd, name) {
  return new Promise((resolve, reject) => {
    console.log(`📦 Starting ${name}...`);
    
    const npmProcess = spawn('npm', ['run', command], {
      cwd: cwd,
      stdio: 'inherit',
      shell: true
    });

    npmProcess.on('error', (error) => {
      console.error(`❌ Error starting ${name}:`, error);
      reject(error);
    });

    npmProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`❌ ${name} exited with code ${code}`);
        reject(new Error(`${name} failed`));
      } else {
        console.log(`✅ ${name} started successfully`);
        resolve();
      }
    });

    return npmProcess;
  });
}

// Install dependencies if node_modules don't exist
async function installDependencies() {
  const fs = require('fs');
  
  // Check frontend dependencies
  if (!fs.existsSync(path.join(__dirname, 'frontend', 'node_modules'))) {
    console.log('📦 Installing frontend dependencies...');
    await runNpmCommand('install', path.join(__dirname, 'frontend'), 'Frontend Dependencies');
  }
  
  // Check backend dependencies
  if (!fs.existsSync(path.join(__dirname, 'backend', 'node_modules'))) {
    console.log('📦 Installing backend dependencies...');
    await runNpmCommand('install', path.join(__dirname, 'backend'), 'Backend Dependencies');
  }
}

// Main function
async function startDevelopment() {
  try {
    // Install dependencies first
    await installDependencies();
    
    console.log('\n🎯 Starting development servers...\n');
    
    // Start backend
    console.log('🔧 Starting Backend Server (http://localhost:5000)...');
    const backendProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'backend'),
      stdio: 'inherit',
      shell: true
    });
    
    // Wait a bit for backend to start
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Start frontend
    console.log('⚛️  Starting Frontend Server (http://localhost:3000)...');
    const frontendProcess = spawn('npm', ['run', 'dev'], {
      cwd: path.join(__dirname, 'frontend'),
      stdio: 'inherit',
      shell: true
    });
    
    console.log('\n✨ Development environment is starting up!');
    console.log('📱 Frontend: http://localhost:3000');
    console.log('🔧 Backend:  http://localhost:5000');
    console.log('\n💡 Press Ctrl+C to stop both servers\n');
    
    // Handle process termination
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down development servers...');
      backendProcess.kill();
      frontendProcess.kill();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to start development environment:', error);
    process.exit(1);
  }
}

// Start the development environment
startDevelopment();
