# Vercel Runtime Log

## Request
ID: kggzq-1778039204840-c9476034e8a4
Time: 2026-05-06T03:46:44.840Z
POST /api/chat → 400
Host: my-tarot-henna.vercel.app
Duration: 660ms
Cache: MISS
Region: hkg1
User Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36
Referer: https://my-tarot-henna.vercel.app/tarot.html

## Lifecycle

### Function
Status: 400
Duration: 185ms
Runtime: nodejs24.x
Memory: 243MB / 2048MB
Region: iad1

## External APIs (1)
POST generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent → 400 163ms

## Deployment
ID: dpl_EkQrAk8iqBaUK8sRmQLQSEasDX5F
Environment: production
Branch: main
