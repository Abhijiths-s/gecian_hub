"use client";
import { useState } from "react";
import { TimeTableSlider } from "./TimeTableSlider";
import Papa from "papaparse";
import { DocumentUpload, NoteRemove } from "iconsax-react";

const TimeTableBlock = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string[][] | null>(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  const nextDay = () => setCurrentDay((prev) => (prev === 4 ? 0 : prev + 1));
  const prevDay = () => setCurrentDay((prev) => (prev === 0 ? 4 : prev - 1));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);

    if (file.type === "text/csv" || file.name.endsWith(".csv")) {
      Papa.parse(file, {
        complete: (result) => {
          setCsvData(result.data as string[][]);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    } else {
      setCsvData(null); // reset if not CSV
    }
  };

  return (
    <>
      <div
        className="border border-[var(--text)] rounded-lg p-4 h-96 flex flex-col"
        data-testid="timetable-block"
      >
        {/* Header */}
        <div className="relative flex-shrink-0 flex justify-between items-center">
          <div className="relative flex items-center">
            <img
              className="absolute h-16 z-10"
              src="/scribble-circle.svg"
              alt="Scribbled circle overlay"
            />
            <h2 className="ml-2 p-3 text-[2rem] font-medium text-[var(--text)] z-20">
              Time Table
            </h2>
          </div>

          {/* Upload Button with Icon */}
          <div className="flex items-center space-x-2 z-20 mr-2">
            {/* Upload Button */}
            {!uploadedFile && !csvData && (
              <label className="flex items-center border border-[var(--text)] space-x-1 px-2 py-1 text-[var(--text)] rounded-lg cursor-pointer text-sm">
                <DocumentUpload size={18} color="black" variant="Bold" />
                <span>Upload</span>
                <input
                  type="file"
                  accept=".csv,image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Remove Button */}
            {(uploadedFile || csvData) && (
              <button
                onClick={() => {
                  setUploadedFile(null);
                  setCsvData(null);
                }}
                className="flex items-center border border-[var(--text)] space-x-1 px-2 py-1 text-[var(--text)] rounded-lg text-sm"
              >
                <NoteRemove size={18} color="black" variant="Bold" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto rounded-xl min-h-0 justify-center items-center flex px-2 py-1"
          onClick={uploadedFile || csvData ? toggleExpand : undefined}
          style={{ cursor: uploadedFile || csvData ? "pointer" : "default" }}
        >
          {uploadedFile?.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(uploadedFile)}
              alt="Uploaded timetable"
              className="max-h-full object-contain"
            />
          )}

          {csvData && (
            <table className="text-sm border bg-white max-w-full">
              <tbody>
                {csvData.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="border px-2 py-1 whitespace-nowrap"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!uploadedFile && !csvData && (
            <TimeTableSlider
              currentDay={currentDay}
              onPrevDay={prevDay}
              onNextDay={nextDay}
            />
          )}
        </div>
      </div>

      {/* Fullscreen Modal Preview */}
      {isExpanded && (uploadedFile || csvData) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={toggleExpand}
        >
          <div className="bg-white rounded-lg p-4 max-h-[90vh] overflow-auto">
            {uploadedFile?.type.startsWith("image/") && (
              <img
                src={URL.createObjectURL(uploadedFile)}
                alt="Full timetable"
                className="max-h-[80vh] max-w-full"
              />
            )}

            {csvData && (
              <table className="text-sm border bg-white">
                <tbody>
                  {csvData.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j} className="border px-2 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TimeTableBlock;
