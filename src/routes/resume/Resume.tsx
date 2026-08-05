import { useState } from 'react';
import resume from '../resume/asset/Bittu Kumar.pdf';
import useDocumentTitle from '../documentTitle/ChangeTitle';
import { FiDownload, FiExternalLink, FiFileText } from 'react-icons/fi';

const Resume = () => {
  useDocumentTitle('Resume | Bittu Kumar');

  const [isLoading, setIsLoading] = useState(true);

  // Most mobile browsers (iOS Safari, Chrome for Android) block inline
  // PDF rendering in an iframe, so give them a direct link instead.
  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <div className="container m-auto mt-16 dark:text-white">
      <div className="mx-auto overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-900">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-gray-50 px-5 py-3 dark:border-gray-800 dark:bg-gray-800/50">
          <div className="flex items-center gap-2 min-w-0">
            <FiFileText className="h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400" />
            <span className="truncate text-sm font-medium text-gray-700 dark:text-gray-200">
              Bittu Kumar — Resume
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200/70 dark:text-gray-300 dark:hover:bg-gray-700/60"
            >
              <FiExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">Open</span>
            </a>
            <a
              href={resume}
              download="Bittu Kumar - Resume.pdf"
              className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <FiDownload className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </a>
          </div>
        </div>

        {/* Viewer */}
        <div className="relative h-[85dvh] w-full bg-gray-100 dark:bg-gray-950">
          {isMobile ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              <FiFileText className="h-12 w-12 text-gray-400 dark:text-gray-600" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Inline preview isn't supported on this device. Open the resume
                directly instead.
              </p>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
              >
                <FiExternalLink className="h-4 w-4" />
                Open Resume
              </a>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <FiDownload className="h-6 w-6 animate-spin text-gray-400" />
                </div>
              )}
              <iframe
                src={resume}
                title="Bittu Kumar Resume"
                className="h-full w-full"
                onLoad={() => setIsLoading(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
