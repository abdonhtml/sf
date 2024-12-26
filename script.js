// استرداد البيانات السابقة من Local Storage أو إنشاء قائمة جديدة
let allRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];

// وظيفة تسجيل البيانات
function submitForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;

  if (name && email && phone) {
    // إضافة البيانات الجديدة إلى القائمة
    const registrationData = { 
      name: name, 
      email: email, 
      phone: phone, 
      date: new Date().toLocaleString() 
    };
    allRegistrations.push(registrationData);

    // تحديث Local Storage
    localStorage.setItem('registrations', JSON.stringify(allRegistrations));

    // عرض رسالة النجاح وإعادة تعيين الحقول
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('registrationForm').reset();
    alert("تم حفظ البيانات بنجاح!");
  } else {
    alert("يرجى ملء جميع الحقول!");
  }
}

// وظيفة طلب كلمة المرور قبل تحميل البيانات
function promptPassword() {
  const password = prompt("من فضلك، أدخل كلمة المرور:");
  if (password === "1234") {
    downloadData();
  } else {
    alert("كلمة المرور غير صحيحة!");
  }
}

// وظيفة تنزيل البيانات كملف JSON
function downloadData() {
  const dataStr = JSON.stringify(allRegistrations, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'registrations.json';
  a.click();
  URL.revokeObjectURL(url);
}

// وظيفة طلب كلمة المرور قبل حذف البيانات
function promptDeletePassword() {
  const password = prompt("من فضلك، أدخل كلمة المرور لحذف البيانات:");
  if (password === "1234") {
    clearData();
  } else {
    alert("كلمة المرور غير صحيحة!");
  }
}

// وظيفة حذف جميع البيانات
function clearData() {
  const confirmDelete = confirm("هل أنت متأكد أنك تريد حذف جميع البيانات؟");
  if (confirmDelete) {
    // حذف البيانات من Local Storage
    localStorage.removeItem('registrations');
    // إعادة تعيين القائمة
    allRegistrations = [];
    alert("تم حذف جميع البيانات بنجاح!");
  }
}