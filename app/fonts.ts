import localFont from 'next/font/local';

// Amara & Partners Sans Serif (for headings)
export const amaraSansSerif = localFont({
  src: [
    {
      path: '../fonts/Amara & Partners Sans Serif/Variable/BlackMangoVariableGX.ttf',
      style: 'normal',
      weight: '100 900',
    },
  ],
  display: 'swap',
  variable: '--font-amara',
});

// Cabinet Grotesk (for body text)
export const cabinetGrotesk = localFont({
  src: [
    {
      path: '../fonts/CabinetGrotesk_Complete/Fonts/WEB/fonts/CabinetGrotesk-Variable.woff2',
      style: 'normal',
      weight: '100 900',
    },
  ],
  display: 'swap',
  variable: '--font-cabinet',
}); 