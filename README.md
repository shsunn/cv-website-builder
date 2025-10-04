# cv-website-builder

一個用 React + TypeScript 寫的 CV 網站建構器，主要用來做 CV 預覽和 PDF 下載。

## 為什麼做這個

原本想找個現成的 CV 模板，但發現大部分都是設計師風格，不太適合學術推甄用，所以就自己寫了一個。

## 技術棧

- React 18 + TypeScript
- Vite（開發工具）
- html2canvas + jsPDF（PDF 生成）
- CSS Grid + Flexbox（排版）

## 怎麼用

1. 下載專案
```bash
git clone https://github.com/shsunn/cv-website-builder.git
cd cv-website-builder
```

2. 安裝依賴
```bash
yarn install
```

3. 啟動開發伺服器
```bash
cd app
yarn dev
```

4. (若須)修改你的資料
編輯 `app/public/data/sample.json`，把你的學歷、專題、比賽經驗填進去

5. 下載 PDF
點右上角的 "Download PDF" 按鈕


## 授權

MIT License

---

*Built with React + TypeScript*