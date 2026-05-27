import PDFDocument from "pdfkit";
import {
  getAllRegistrations,
  getBreakdown,
  getTotals,
  type BreakdownRow,
  type RegistrationRow,
} from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const totals = getTotals();
  const byCountry = getBreakdown("country");
  const byChurch = getBreakdown("church");
  const rows = getAllRegistrations();

  const buffer = await renderPdf({ totals, byCountry, byChurch, rows });

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString().slice(0, 10)}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

function renderPdf(args: {
  totals: { count: number; attendees: number };
  byCountry: BreakdownRow[];
  byChurch: BreakdownRow[];
  rows: RegistrationRow[];
}): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      info: { Title: "TFN Kenya · Registrations", Author: "TFN Fellowship" },
    });
    const chunks: Buffer[] = [];
    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("TFN Kenya · Registrations", { align: "left" });
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#666")
      .text(`Generated ${new Date().toLocaleString()}`)
      .moveDown(1)
      .fillColor("black");

    doc.font("Helvetica-Bold").fontSize(13).text("Summary").moveDown(0.3);
    doc
      .font("Helvetica")
      .fontSize(11)
      .text(`Total registrations: ${args.totals.count}`)
      .text(`Total attendees:     ${args.totals.attendees}`)
      .moveDown(1);

    renderBreakdown(doc, "By country", args.byCountry);
    renderBreakdown(doc, "By church", args.byChurch);

    doc.addPage();
    doc.font("Helvetica-Bold").fontSize(13).text("Registrations").moveDown(0.5);
    renderTable(doc, args.rows);

    doc.end();
  });
}

function renderBreakdown(
  doc: PDFKit.PDFDocument,
  title: string,
  rows: BreakdownRow[],
): void {
  doc.font("Helvetica-Bold").fontSize(12).text(title).moveDown(0.2);
  if (rows.length === 0) {
    doc.font("Helvetica").fontSize(10).fillColor("#888").text("No data.");
    doc.fillColor("black").moveDown(0.8);
    return;
  }
  doc.font("Helvetica").fontSize(10);
  for (const r of rows) {
    doc.text(`${r.key}  —  ${r.count} reg · ${r.attendees} att`);
  }
  doc.moveDown(0.8);
}

function renderTable(doc: PDFKit.PDFDocument, rows: RegistrationRow[]): void {
  const headers = ["When", "Name", "Email", "Country", "Church", "Att."];
  const colWidths = [85, 100, 130, 75, 85, 30];
  const startX = doc.page.margins.left;
  const usableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  let y = doc.y;
  const drawHeader = () => {
    doc.font("Helvetica-Bold").fontSize(9).fillColor("black");
    let x = startX;
    headers.forEach((h, i) => {
      doc.text(h, x, y, { width: colWidths[i] });
      x += colWidths[i];
    });
    y += 14;
    doc
      .moveTo(startX, y - 2)
      .lineTo(startX + usableWidth, y - 2)
      .strokeColor("#ccc")
      .stroke();
  };

  drawHeader();

  if (rows.length === 0) {
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#888")
      .text("No registrations yet.", startX, y + 4);
    return;
  }

  doc.font("Helvetica").fontSize(9).fillColor("black");
  for (const r of rows) {
    const cells = [
      new Date(r.received_at).toLocaleString(),
      r.full_name,
      r.email,
      r.country,
      r.church,
      String(r.attending),
    ];
    const rowHeights = cells.map((c, i) =>
      doc.heightOfString(c, { width: colWidths[i] - 4 }),
    );
    const rowHeight = Math.max(...rowHeights) + 4;

    if (y + rowHeight > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
      y = doc.page.margins.top;
      drawHeader();
    }

    let x = startX;
    cells.forEach((c, i) => {
      doc.text(c, x + 2, y, { width: colWidths[i] - 4 });
      x += colWidths[i];
    });
    y += rowHeight;
    doc
      .moveTo(startX, y - 1)
      .lineTo(startX + usableWidth, y - 1)
      .strokeColor("#eee")
      .stroke();
  }
}
