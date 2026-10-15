# صفحة «مراسلتنا» — الطيران العراقي

صفحة واحدة `index.html` بنفس ستايل بطاقات الطقس (أخضر + نعناعي + W)، ترسل الرسائل إلى **n8n** عبر Webhook.

## التشغيل (٣ خطوات)
1. **n8n**: استورد `n8n-workflow.json` (Workflows ← Import from file).
   - في عقدة «تنبيه تيليغرام» اختر الـ Credentials وضع `chatId` حقك. (أو احذفها وضع عقدة Gmail/Email/Google Sheets.)
   - فعّل الـ Workflow (Active) — **لازم** حتى يشتغل الرابط الإنتاجي `/webhook/...` (وليس `/webhook-test/...`).
2. انسخ **Production URL** من عقدة Webhook وضعه في أول `<script>` داخل `index.html`:
   ```js
   const N8N_WEBHOOK_URL = "https://YOUR-N8N-DOMAIN/webhook/iraqi-aviation-contact";
   ```
3. ارفع `index.html` على أي استضافة ثابتة (GitHub Pages / Netlify / Cloudflare Pages).
   - لو الصفحة على دومين ثاني غير n8n: في عقدة Webhook حقل **Allowed Origins (CORS)** ضع دومين موقعك بدل `*`.

## البيانات اللي توصل لـ n8n (JSON، داخل `body`)
`ticket` · `name` · `contact` (إيميل أو @تيليغرام) · `topic` · `message` · `website` (فخ بوتات، لازم فاضي) · `page` · `lang` · `ua` · `sentAt`

## الرد على الشخص
- رقم المراسلة `ticket` يطلع للزائر ويوصلك بالتنبيه، فتكدر تتابع كل رسالة بالرقم.
- إذا وسيلة الرد **إيميل**: أضف بعد عقدة التنبيه عقدة **Gmail ← Send** (To = `{{$json.body.contact}}`) أو اجعلها فرع يدوي.
- إذا **تيليغرام**: رد عليه مباشرة من حسابك على المعرّف المكتوب.

## الحماية من السبام
- حقل فخ مخفي `website` (أي رسالة فيه شي تنتجاهل)، تأخير ٣ ثواني قبل الإرسال، ومنع إرسال أكثر من رسالة بالدقيقة بالمتصفح.
