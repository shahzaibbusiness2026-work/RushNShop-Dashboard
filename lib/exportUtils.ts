/**
 * Export and Clipboard Utilities for Google Sheets, CSV, and Reports
 */

export function exportToGoogleSheetsCSV(filename: string, rows: Record<string, any>[]) {
  if (!rows || !rows.length || !rows[0]) return;

  const headers = Object.keys(rows[0] as object);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((header) => {
          let cell = row[header] === undefined || row[header] === null ? '' : String(row[header]);
          // Escape quotes and wrap in quotes if contains commas or newlines
          if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
            cell = `"${cell.replace(/"/g, '""')}"`;
          }
          return cell;
        })
        .join(','),
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function copyForGoogleSheets(rows: Record<string, any>[]): boolean {
  if (!rows || !rows.length || !rows[0]) return false;

  const headers = Object.keys(rows[0] as object);
  // Tab-separated format copies and pastes cleanly into Google Sheets & Excel cells
  const tsvContent = [
    headers.join('\t'),
    ...rows.map((row) =>
      headers
        .map((h) => {
          const val = row[h] === undefined || row[h] === null ? '' : String(row[h]);
          return val.replace(/\t/g, ' ').replace(/\n/g, ' ');
        })
        .join('\t'),
    ),
  ].join('\n');

  try {
    navigator.clipboard.writeText(tsvContent);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
