import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import "../styles/Home.css";

const VimTerminal = ({ onClick }) => {
  const [vimInput, setVimInput] = useState('');
  const [vimOutput, setVimOutput] = useState('');
  const [isVimInteractive, setIsVimInteractive] = useState(false);
  const [currentFile, setCurrentFile] = useState('welcome.txt');
  const [scrollOffset, setScrollOffset] = useState(0);
  const [cursorLine, setCursorLine] = useState(0);
  const vimInputRef = useRef(null);
  const vimContentRef = useRef(null);

  // Terminal State
  const [currentDir, setCurrentDir] = useState('/home/sparsh');
  const [fileSystem, setFileSystem] = useState({
    '/home/sparsh': {
      type: 'dir',
      children: {
        'welcome.txt': { type: 'file', content: [
          '// Welcome to Sparsh\'s Portfolio Terminal',
          '// Type /help for available commands or shell commands (ls, pwd, cat, etc.)',
          '',
          '// About Me:',
          '// Backend Engineer & Data Platform Developer',
          '// Building scalable distributed systems at Wingify',
          '',
          '// Quick Commands:',
          '// /resume - Download my resume',
          '// /linkedin - Copy LinkedIn URL to clipboard',
          '// /github - Copy GitHub URL to clipboard',
          '// /email - Copy email to clipboard',
          '',
          '// Shell Commands:',
          '// ls, pwd, cd, cat, mkdir, touch, rm, clear',
          '',
          '// Navigation:',
          '// j/k - Scroll down/up | :e <file> - Open file | :ls - List files',
        ]},
        'backend.go': { type: 'file', content: [
          'package main',
          '',
          'import (',
          '\t"fmt"',
          '\t"log"',
          '\t"net/http"',
          ')',
          '',
          'func main() {',
          '\t// Initialize distributed system',
          '\tsystem := NewDistributedSystem()',
          '',
          '\t// Start event consumers',
          '\tgo system.StartKafkaConsumers()',
          '',
          '\t// Serve API',
          '\thttp.HandleFunc("/api/v1/data", system.HandleDataIngestion)',
          '\tlog.Fatal(http.ListenAndServe(":8080", nil))',
          '}',
          '',
          'func (s *DistributedSystem) HandleDataIngestion(w http.ResponseWriter, r *http.Request) {',
          '\t// Process 50M+ events/day',
          '\tdata := Decode(r.Body)',
          '\ts.kafkaProducer.Produce("events", data)',
          '\tw.WriteHeader(http.StatusAccepted)',
          '}',
        ]},
        'skills.json': { type: 'file', content: [
          '{',
          '  "languages": ["Go", "Python", "Java", "JavaScript"],',
          '  "technologies": [',
          '    "Kafka",',
          '    "Redis",',
          '    "PostgreSQL",',
          '    "Docker",',
          '    "Kubernetes",',
          '    "AWS"',
          '  ],',
          '  "interests": ["Distributed Systems", "System Design", "Scalability"]',
          '}',
        ]},
        'contact.md': { type: 'file', content: [
          '# Contact Information',
          '',
          '- Email: sparshagarwal811@gmail.com',
          '- LinkedIn: linkedin.com/in/sparsh-agarwal1401',
          '- GitHub: github.com/Sparsh1401',
          '',
          'Feel free to reach out for collaboration or opportunities!',
        ]},
        'projects': { type: 'dir', children: {} },
      }
    }
  });

  // Helper: Get current directory object
  const getCurrentDirObj = () => {
    const parts = currentDir.split('/').filter(Boolean);
    let current = fileSystem['/home/sparsh'];
    for (const part of parts.slice(1)) {
      if (current.children && current.children[part]) {
        current = current.children[part];
      }
    }
    return current;
  };

  // Helper: Get file/dir at path
  const getPathObj = (path) => {
    const isAbsolute = path.startsWith('/');
    const fullPath = isAbsolute ? path : `${currentDir}/${path}`;
    const parts = fullPath.split('/').filter(Boolean);

    let current = fileSystem['/home/sparsh'];
    for (let i = 1; i < parts.length; i++) {
      if (current.children && current.children[parts[i]]) {
        current = current.children[parts[i]];
      } else {
        return null;
      }
    }
    return current;
  };

  // Convert fileSystem to legacy files format for compatibility
  const files = {};
  const extractFiles = (obj) => {
    if (obj.type === 'file') {
      return obj.content;
    }
    return null;
  };

  const buildFilesMap = (node, path = '') => {
    if (node.children) {
      Object.keys(node.children).forEach(name => {
        const child = node.children[name];
        if (child.type === 'file') {
          files[name] = child.content;
        }
        buildFilesMap(child, path + name + '/');
      });
    }
  };
  buildFilesMap(fileSystem['/home/sparsh']);

  const handleShellCommand = (command) => {
    const parts = command.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);

    // Get current directory contents
    const dirObj = getCurrentDirObj();

    switch (cmd) {
      case 'ls':
        if (dirObj && dirObj.children) {
          const items = Object.keys(dirObj.children).map(name => {
            const isDir = dirObj.children[name].type === 'dir';
            return isDir ? `${name}/` : name;
          });
          setVimOutput(items.join('  ') || 'empty directory');
        } else {
          setVimOutput('ls: cannot access directory');
        }
        break;

      case 'pwd':
        setVimOutput(currentDir);
        break;

      case 'cd':
        if (args.length === 0) {
          setCurrentDir('/home/sparsh');
          setVimOutput('');
        } else {
          const target = args[0];
          if (target === '..') {
            const parts = currentDir.split('/').filter(Boolean);
            if (parts.length > 2) {
              setCurrentDir('/' + parts.slice(0, -1).join('/'));
              setVimOutput('');
            } else {
              setVimOutput('cd: already at root');
            }
          } else if (target === '~' || target === '/home/sparsh') {
            setCurrentDir('/home/sparsh');
            setVimOutput('');
          } else {
            if (dirObj.children && dirObj.children[target] && dirObj.children[target].type === 'dir') {
              setCurrentDir(`${currentDir}/${target}`.replace('//', '/'));
              setVimOutput('');
            } else {
              setVimOutput(`cd: ${target}: No such directory`);
            }
          }
        }
        break;

      case 'cat':
        if (args.length === 0) {
          setVimOutput('cat: missing file operand');
        } else {
          const filename = args[0];
          if (dirObj.children && dirObj.children[filename] && dirObj.children[filename].type === 'file') {
            const content = dirObj.children[filename].content.join('\n');
            setVimOutput(content);
          } else {
            setVimOutput(`cat: ${filename}: No such file`);
          }
        }
        break;

      case 'mkdir':
        if (args.length === 0) {
          setVimOutput('mkdir: missing operand');
        } else {
          const dirname = args[0];
          if (dirObj.children && !dirObj.children[dirname]) {
            setFileSystem(prev => {
              const newFS = JSON.parse(JSON.stringify(prev));
              const parts = currentDir.split('/').filter(Boolean);
              let current = newFS['/home/sparsh'];
              for (let i = 1; i < parts.length; i++) {
                current = current.children[parts[i]];
              }
              current.children[dirname] = { type: 'dir', children: {} };
              return newFS;
            });
            setVimOutput(`mkdir: created directory '${dirname}'`);
          } else {
            setVimOutput(`mkdir: cannot create directory '${dirname}': File exists`);
          }
        }
        break;

      case 'touch':
        if (args.length === 0) {
          setVimOutput('touch: missing file operand');
        } else {
          const filename = args[0];
          if (dirObj.children && !dirObj.children[filename]) {
            setFileSystem(prev => {
              const newFS = JSON.parse(JSON.stringify(prev));
              const parts = currentDir.split('/').filter(Boolean);
              let current = newFS['/home/sparsh'];
              for (let i = 1; i < parts.length; i++) {
                current = current.children[parts[i]];
              }
              current.children[filename] = { type: 'file', content: [] };
              return newFS;
            });
            setVimOutput(`touch: created file '${filename}'`);
          } else {
            setVimOutput(`touch: '${filename}' already exists`);
          }
        }
        break;

      case 'rm':
        if (args.length === 0) {
          setVimOutput('rm: missing operand');
        } else {
          const filename = args[0];
          if (dirObj.children && dirObj.children[filename]) {
            setFileSystem(prev => {
              const newFS = JSON.parse(JSON.stringify(prev));
              const parts = currentDir.split('/').filter(Boolean);
              let current = newFS['/home/sparsh'];
              for (let i = 1; i < parts.length; i++) {
                current = current.children[parts[i]];
              }
              delete current.children[filename];
              return newFS;
            });
            setVimOutput(`rm: removed '${filename}'`);
          } else {
            setVimOutput(`rm: cannot remove '${filename}': No such file or directory`);
          }
        }
        break;

      case 'clear':
        setVimOutput('');
        break;

      case 'whoami':
        setVimOutput('sparsh');
        break;

      case 'echo':
        setVimOutput(args.join(' '));
        break;

      default:
        return false; // Command not recognized as shell command
    }
    return true; // Command was handled
  };

  const handleVimCommand = (command) => {
    const cmd = command.trim();
    const cmdLower = cmd.toLowerCase();
    const parts = cmd.split(' ');

    // Portfolio slash commands - handle these FIRST
    if (cmdLower === '/resume' || cmdLower === ':resume' || cmdLower === ':download resume') {
      setVimOutput('📥 Opening resume...');
      setTimeout(() => {
        window.open('https://drive.google.com/file/d/1NnSmi8aOpmzpIf6yj6ycfAnsUfvfoYTc/view', '_blank');
        setVimOutput('✅ Resume opened in new tab!');
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 2000);
      }, 500);
    } else if (cmdLower === '/linkedin' || cmdLower === ':linkedin') {
      const linkedinUrl = 'https://www.linkedin.com/in/sparsh-agarwal1401/';
      navigator.clipboard.writeText(linkedinUrl).then(() => {
        setVimOutput('✅ LinkedIn URL copied to clipboard!');
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 3000);
      }).catch(() => {
        setVimOutput('Opening LinkedIn profile...');
        setTimeout(() => {
          window.open(linkedinUrl, '_blank');
          setVimOutput('');
          setVimInput('');
        }, 800);
      });
    } else if (cmdLower === '/github' || cmdLower === ':github') {
      const githubUrl = 'https://github.com/Sparsh1401';
      navigator.clipboard.writeText(githubUrl).then(() => {
        setVimOutput('✅ GitHub URL copied to clipboard!');
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 3000);
      }).catch(() => {
        window.open(githubUrl, '_blank');
        setVimOutput('');
        setVimInput('');
      });
    } else if (cmdLower === '/skills' || cmdLower === ':skills') {
      setVimOutput('Scrolling to skills section...');
      setTimeout(() => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        setVimOutput('');
        setVimInput('');
      }, 800);
    } else if (cmdLower === '/contact' || cmdLower === '/email' || cmdLower === ':contact' || cmdLower === ':email') {
      const email = 'sparshagarwal811@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        setVimOutput('✅ Email copied to clipboard!');
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 3000);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    } else if (cmdLower === '/help' || cmdLower === ':help') {
      setVimOutput('Vim: /resume, /linkedin, /github, /email, /skills, :ls, :e <file> | Shell: ls, pwd, cd, cat, mkdir, touch, rm, clear');
      setTimeout(() => {
        setVimOutput('');
        setVimInput('');
      }, 6000);
    } else if (parts[0] === ':ls') {
      setVimOutput(Object.keys(files).join('  '));
      setTimeout(() => {
        setVimOutput('');
        setVimInput('');
      }, 4000);
    } else if (parts[0] === ':e') {
      const filename = parts[1];
      if (files[filename]) {
        setCurrentFile(filename);
        setScrollOffset(0);
        setCursorLine(0);
        setVimOutput(`"${filename}" [New File]`);
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 2000);
      } else {
        setVimOutput(`E345: Can't find file "${filename}"`);
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 2000);
      }
    } else if (!cmd.startsWith(':') && !cmd.startsWith('/')) {
      // Try shell commands for inputs without prefix
      if (handleShellCommand(cmd)) {
        setTimeout(() => {
          if (cmd.split(' ')[0] !== 'cat' && cmd.split(' ')[0] !== 'ls' && cmd.split(' ')[0] !== 'pwd') {
            setVimOutput('');
          }
          setVimInput('');
        }, cmd.split(' ')[0] === 'clear' ? 0 : 3000);
      } else {
        setVimOutput(`Command not found: ${cmd.split(' ')[0]}`);
        setTimeout(() => {
          setVimOutput('');
          setVimInput('');
        }, 2500);
      }
    } else {
      setVimOutput(`E492: Not an editor command: ${command}`);
      setTimeout(() => {
        setVimOutput('');
        setVimInput('');
      }, 2500);
    }
  };

  const handleVimKeyDown = (e) => {
    if (isVimInteractive) {
      if (document.activeElement !== vimInputRef.current) {
        vimInputRef.current?.focus();
      }
      
      if (e.key === 'Enter') {
        handleVimCommand(vimInput);
      } else if (e.key === 'Escape') {
        setIsVimInteractive(false);
        setVimInput('');
        setVimOutput('');
        setTimeout(() => vimContentRef.current?.focus(), 0);
      }
      return; 
    }

    const fileLines = files[currentFile];
    const visibleLines = 10; 

    switch (e.key) {
      case 'j':
      case 'ArrowDown':
        if (cursorLine < fileLines.length - 1) {
          setCursorLine(prev => prev + 1);
          if (cursorLine - scrollOffset >= visibleLines - 2) {
            setScrollOffset(prev => Math.min(prev + 1, fileLines.length - visibleLines));
          }
        }
        break;
      case 'k':
      case 'ArrowUp':
        if (cursorLine > 0) {
          setCursorLine(prev => prev - 1);
          if (cursorLine - scrollOffset <= 1) {
            setScrollOffset(prev => Math.max(prev - 1, 0));
          }
        }
        break;
      case 'g':
        if (e.ctrlKey) { 
           setVimOutput(`"${currentFile}" ${files[currentFile].length} lines`);
           setTimeout(() => setVimOutput(''), 2000);
        }
        break;
      case ':':
      case '/':
        setIsVimInteractive(true);
        setVimInput(e.key);
        setTimeout(() => vimInputRef.current?.focus(), 50);
        break;
      case 'i':
      case '$':
        setIsVimInteractive(true);
        setVimInput('');
        setVimOutput('-- SHELL --');
        setTimeout(() => {
          setVimOutput('');
          vimInputRef.current?.focus();
        }, 1000);
        break;
      default:
        break;
    }
  };

  const handleVimClick = () => {
    vimContentRef.current?.focus();
    if (onClick) onClick();
  };

  const renderLines = () => {
    const fileLines = files[currentFile];
    const visibleCount = 12;
    const start = scrollOffset;
    const end = Math.min(start + visibleCount, fileLines.length);
    
    return fileLines.slice(start, end).map((line, idx) => {
      const lineNum = start + idx;
      const isCursor = lineNum === cursorLine;
      return (
        <div key={lineNum} className={`vim-line ${isCursor ? 'active-line' : ''}`}>
          <span className="vim-line-number">{lineNum + 1}</span>
          <span className="vim-text">
            {line}
            {isCursor && !isVimInteractive && <span className="vim-block-cursor"> </span>}
          </span>
        </div>
      );
    });
  };

  return (
    <motion.div
      className="vim-terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      onClick={handleVimClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="vim-header">
        <div className="vim-buttons">
          <span className="vim-button close"></span>
          <span className="vim-button minimize"></span>
          <span className="vim-button maximize"></span>
        </div>
        <div className="vim-title">sparsh@backend:{currentDir}</div>
        <div className="vim-mode">{isVimInteractive ? '-- COMMAND --' : '-- INSERT --'}</div>
      </div>
      <div
        className="vim-content"
        ref={vimContentRef}
        tabIndex={0}
        onKeyDown={handleVimKeyDown}
        style={{ outline: 'none', border: '1px solid transparent' }}
        onFocus={(e) => e.currentTarget.style.borderColor = 'var(--color-lime)'}
        onBlur={(e) => e.currentTarget.style.borderColor = 'transparent'}
      >
        {renderLines()}
        
        <div className="vim-status-line">
            {vimOutput && (
              <div className="vim-output-message">{vimOutput}</div>
            )}
            <div className="vim-command-input-area">
                {isVimInteractive ? (
                    <>
                        {(vimInput.startsWith(':') || vimInput.startsWith('/')) && (
                            <span className="vim-command-char">{vimInput.charAt(0)}</span>
                        )}
                        {!vimInput.startsWith(':') && !vimInput.startsWith('/') && (
                            <span className="vim-command-char">$</span>
                        )}
                        <input
                            ref={vimInputRef}
                            type="text"
                            value={vimInput.startsWith(':') || vimInput.startsWith('/') ? vimInput.substring(1) : vimInput}
                            onChange={(e) => {
                                if (vimInput.startsWith(':') || vimInput.startsWith('/')) {
                                    setVimInput(vimInput.charAt(0) + e.target.value);
                                } else {
                                    setVimInput(e.target.value);
                                }
                            }}
                            onKeyDown={handleVimKeyDown}
                            className="vim-input-field"
                            autoFocus
                            placeholder={vimInput.startsWith(':') || vimInput.startsWith('/') ? '' : 'type shell command...'}
                        />
                    </>
                ) : (
                    <span className="vim-mode-indicator">{isVimInteractive ? '-- INSERT --' : ''}</span>
                )}
            </div>
        </div>
      </div>
      <div className="vim-status-bar">
        <span className="vim-status-left">{currentFile}</span>
        <span className="vim-status-right">UTF-8 | {currentFile.endsWith('.go') ? 'Go' : 'Text'} | Ln {cursorLine + 1}, Col 1</span>
      </div>
    </motion.div>
  );
};

export default VimTerminal;
