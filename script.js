// ==========================================
// نظام إدارة وتحليل نتائج الطلاب (Console-Based)
// ==========================================

// ===== 1) هيكلة بيانات الطالب (Class & Constructor) =====
class MenaaMohamed {
  constructor(id, name, grades, attendance) {
    this.id = id;                 // رقم الجلوس
    this.name = name;             // الاسم
    this.grades = grades;         // مصفوفة درجات 3 مواد
    this.attendance = attendance; // نسبة الحضور
  }

  // ===== 2) دوال التحليل الأكاديمي =====

  // حساب المتوسط باستخدام reduce
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // التقدير بالحروف باستخدام if/else
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // النتيجة النهائية: شرطين باستخدام &&
  getFinalResult() {
    if (this.calculateAverage() >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ===== 3) نظام تشغيل الجامعة (Objects Array) =====
const studentsList = [
  new MenaaMohamed(101, "أحمد", [90, 85, 95], 90), // متوسط 90.00
  new MenaaMohamed(102, "سارة", [70, 65, 75], 80), // متوسط 70.00
  new MenaaMohamed(103, "عمر", [45, 43, 48], 85),  // متوسط 45.33 (متعثر)
  new MenaaMohamed(104, "منى", [49, 44, 46], 70),  // متوسط 46.33 (متعثر)
];

// ===== 4) لجنة الرأفة (Array Methods) =====

// الاستخراج: filter للطلاب اللي متوسطهم من 40 إلى 49
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average < 50;
});

// المعالجة: map لإضافة 5 درجات رأفة لمتوسط كل متعثر
const leniencyStudents = strugglingStudents.map((student) => {
  const oldAverage = student.calculateAverage();
  return {
    id: student.id,
    name: student.name,
    oldAverage: Number(oldAverage.toFixed(2)),
    newAverage: Number((oldAverage + 5).toFixed(2)),
  };
});

// التحليل: reduce لجمع المتوسطات الجديدة بعد التعديل
const totalNewAverages = leniencyStudents.reduce(
  (sum, student) => sum + student.newAverage,
  0
);

// متوسط الرأفة مع "درع الحماية" من القسمة على صفر
let leniencyAverage = 0;
if (leniencyStudents.length > 0) {
  leniencyAverage = totalNewAverages / leniencyStudents.length;
}

// ===== 5) المخرجات (Console Logging) =====

console.log("========== تقرير الطلاب ==========");
studentsList.forEach((student) => {
  const average = student.calculateAverage();
  console.log(
    `الاسم: ${student.name} | المتوسط: ${average.toFixed(2)} | التقدير: ${student.getGrade(average)} | النتيجة: ${student.getFinalResult()}`
  );
});

console.log("========== الطلاب المتعثرون بعد الرأفة ==========");
console.log(leniencyStudents);

console.log("========== متوسط المتعثرين بعد التعديل ==========");
console.log(leniencyAverage.toFixed(2));
