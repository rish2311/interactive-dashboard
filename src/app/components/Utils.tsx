const Utils = {
    months({ count }: { count: number }): string[] {
      const monthNames: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'
      ];
      return Array.from({ length: count }, (_, i) => monthNames[i % 12]);
    },
  
    rand(min: number, max: number): number {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  
    CHART_COLORS: {
      red: '#ff6384',
      blue: '#36a2eb',
      green: '#4bc0c0',
      yellow: '#ffcd56',
      purple: '#9966ff',
      orange: '#ff9f40',
    } as Record<string, string>
  };
  
  export default Utils;