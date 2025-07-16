import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateEmployeesPDF = (employees) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Employee List", 14, 22);

    const columns = ["Name", "Email", "Location", "Position", "Phone"];
    const rows = employees.map(emp => [
        emp.EmpName || "-",
        emp.Email || "-",
        emp.Location || "-",
        emp.Position || "-",
        emp.PhoneNumber || "-"
    ]);

    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 30,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save(`Employees_${new Date().toISOString().split("T")[0]}.pdf`);
};
