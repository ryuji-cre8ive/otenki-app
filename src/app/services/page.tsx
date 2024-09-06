import React from "react";

const ServicePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        <span className="text-blue-500">お天気</span>OPPAIとは
      </h1>

      <section className="mb-8">
        <p className="mb-4">
          お天気OPPAIは、最新の気象データとおっぱい予測機能を組み合わせた革新的な天気予報サービスです。
          <br />
          ユーザーの位置情報（現在はTokyoのみ）に基づいて、高精度な天気予報と気象情報を提供します。
        </p>
      </section>

      <section className="mb-8">
        <p className="mb-4">
          open-meteoという気象データを提供するサービスを使用しています。
          <br />
          API提供者さんごめんなさい 。。。
        </p>
      </section>
    </div>
  );
};

export default ServicePage;
