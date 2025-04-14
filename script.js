document.getElementById("pressReleaseForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  // 각 항목의 값을 수집
  const data = {
    "행사주관": document.getElementById("organizer").value,
    "행사장소": document.getElementById("location").value,
    "행사일자": document.getElementById("date").value,
    "행사목적": document.getElementById("purpose").value,
    "행사규모(인원) (예상)": document.getElementById("expectedScale").value,
    "행사 지원자(기관)-재원마련": document.getElementById("supporters").value,
    "행사규모(인원) (실제)": document.getElementById("actualScale").value,
    "행사참석자(주요내빈)": document.getElementById("guests").value,
    "행사내용(식순)": document.getElementById("agenda").value,
    "대회사 or 기관장 소감": document.getElementById("greeting").value,
    "축사 or 내빈 소감": document.getElementById("congratulatory").value,
    "유공자 표창": document.getElementById("award").value,
    "식전공연 or 식후 공연": document.getElementById("performance").value,
    "행사 후원품 제공 기관(당일)": document.getElementById("sponsorOrg").value,
    "행사 후원물품(규모)": document.getElementById("sponsorGoods").value,
    "지역사회 미친 영향": document.getElementById("communityImpact").value,
    "관련 문의": document.getElementById("inquiry").value,
    "주최 or 주관 소개": document.getElementById("organizerIntro").value,
  };

  // OpenAI에 전달할 프롬프트 생성
  let prompt = "다음 정보를 기반으로 보도자료를 작성해줘:\n";
  for (let key in data) {
    prompt += `${key}: ${data[key]}\n`;
  }

  // 결과 영역에 로딩 메시지 표시
  document.getElementById("generatedPressRelease").textContent = "보도자료 생성 중... 잠시만 기다려주세요.";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // YOUR_API_KEY 부분을 실제 OpenAI API 키로 교체하세요.
        "Authorization": "Bearer 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"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant that writes press releases." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    const json = await response.json();
    const pressRelease = json.choices[0].message.content;
    document.getElementById("generatedPressRelease").textContent = pressRelease;
  } catch (error) {
    console.error("보도자료 생성 오류:", error);
    document.getElementById("generatedPressRelease").textContent = "보도자료 생성 중 오류가 발생했습니다.";
  }
});
