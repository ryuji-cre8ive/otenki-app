import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">おっぱい予報について</h1>
      <div className="space-y-4">
        <p className="text-lg">おっぱいを予想したい人向けのサービスです。</p>
        <p className="text-lg">
          天気を確認するだけでなくて楽しみながら気象情報を確認しましょう。
        </p>
        <p className="text-lg">
          想像力が豊かな人は起床してしまうかも？
          <span className="text-sm text-gray-600">（どこが）</span>
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
