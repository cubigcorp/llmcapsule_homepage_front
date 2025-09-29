/**
 * 날짜 포맷팅 유틸리티
 */

/**
 * ISO 날짜 문자열을 YYYY.MM.DD 형식으로 변환
 * @param dateString - ISO 날짜 문자열 (예: "2025-10-22T10:00:00")
 * @returns 포맷된 날짜 문자열 (예: "2025.10.22")
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error('Date formatting error:', error);
    return dateString;
  }
}

/**
 * ISO 날짜 문자열을 YY.MM.DD 형식으로 변환 (2자리 연도)
 * @param dateString - ISO 날짜 문자열 (예: "2025-10-22T10:00:00")
 * @returns 포맷된 날짜 문자열 (예: "25.10.22")
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = String(date.getFullYear()).slice(-2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error('Date short formatting error:', error);
    return dateString;
  }
}

/**
 * ISO 날짜 문자열을 YYYY.MM.DD HH:mm 형식으로 변환
 * @param dateString - ISO 날짜 문자열 (예: "2025-10-22T10:00:00")
 * @returns 포맷된 날짜시간 문자열 (예: "2025.10.22 10:00")
 */
export function formatDateTime(dateString: string): string {
  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return dateString;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('DateTime formatting error:', error);
    return dateString;
  }
}
