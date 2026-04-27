import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // 1. DNSプリフェッチの制御（パフォーマンス/プライバシー）
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // 2. HTTPSの強制 (HSTS)
          { key: 'Strict-Transport-Security', value: 'max-age=0; includeSubDomains;' },
          // 3. クリックジャッキング対策
          // { key: 'X-Frame-Options', value: 'DENY' },
          // 4. MIMEタイプスニッフィング対策
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // 5. リファラ情報の制御
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // 6. 機能の使用制限 (カメラ・マイク等)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
          // 7. XSS対策の要 (CSP)
          { 
            key: 'Content-Security-Policy', 
            value: [
                "default-src 'self'",
                "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                "style-src 'self' 'unsafe-inline'",
                "img-src 'self' data: https:",
                "font-src 'self' data:",
                "connect-src 'self' https: wss:",
                "frame-ancestors https://discord.com https://*.discord.com"
            ].join('; ')
          }
        ],
      },
    ];
  },
};

export default nextConfig;