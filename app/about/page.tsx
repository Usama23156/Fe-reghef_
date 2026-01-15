import React from "react";

const page = () => {
  return (
    <div>
      <div className="About-Us pt-16 pb-10 top-22.25">
        <div className="Main top-[257.5px] gap-13.75">
          <div className="Header">
            <div className="bg-neutral-900">
              <img
                loading="lazy"
                alt=""
                className=" w-full h-96 bg-center bg-cover opacity-50 "
                style={{ backgroundImage: `url(/about1.jpeg)` }}
              />
            </div>
          </div>
          <div className="body md:pr-36.25 md:pl-36.25 pl-8 pr-8 flex flex-col relative pt-10 ">
            <div className=" left-3.75">
              <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435]">
                بدأت حكايتنا من 2024 بحلم بسيط وطموح كبير: نقدم أكل شرقي أصيل
                بطعم حقيقي وجودة نثق فيها. اتخصصنا في 4 أصناف أساسية بنعتبرهم سر
                نجاحنا: الكفتة، الحواوشي، الكبدة المشوية، والشيش وقدمناهم في
                ساندوتشات بطعم ثابت وجودة ما بتتغيرش. مع ثقة عملائنا ودعمهم،
                قدرنا نكبر خطوة بخطوة
              </p>
            </div>

            <div className="  pt-10 md:pl-10">
              <p className="font-normal text-xl leading-6 tracking-[0%] align-middle text-[#202435]">
                و النهارده بقينا موجودين بـ فرعين، ولسه مكملين بنفس الشغف ونفس
                الحرص على الطعم والنضافة وجودة الخامات. هدفنا دايمًا إن كل
                ساندوتش يوصلك سخن، مظبوط، وبنفس الطعم اللي بتحبه لأن رضاك هو سر
                استمرارنا.
              </p>
            </div>
          </div>
          <div className=" pt-10">
            <img
              loading="lazy"
              style={{ backgroundImage: `url(/about2.jpeg)` }}
              alt=""
              className="w-full h-96 bg-center bg-cover bg-fixed"
            />
          </div>
          <div className="body md:pr-36.25 md:pl-36.25 pl-8 pr-8 flex flex-col relative ">
            <div className=" max-w-full  pt-15 pr-3.75 pb-10  pl-3.75 lg:pl-10">
              <div className=" pl-10">
                <p className="font-bold text-4xl leading-6 tracking-[-0.1px] align-middle text-[#202435]">
                  فريقنا
                </p>
              </div>
              <div className=" gap-4 pt-3.75">
                <div>
                  <p className="font-normal text-96  tracking-[0%] align-middle text-[#202435] md:pr-14 ">
                    نجاح أي مكان مش بييجي من وصفة حلوة وبس، لكن بيبدأ من ناس
                    شغوفة بتحب اللي بتعمله وبتحترم كل تفصيلة فيه. من أول يوم،
                    اعتمدنا على فريق واحد متماسك بيشتغل بروح المجموعة، وكل فرد
                    فيه عارف دوره ومسؤولياته كويس. تيمنا مش مجرد عمالة، ده
                    مجموعة من الناس اللي كبرت مع المكان واتعلمت، وطورت من نفسها،
                    وبقت جزء أساسي من رحلتنا. كل واحد في التيم ليه دور مهم:
                  </p>
                </div>
                <div className="md:pt-1 pt-3">
                  <p className=" font-normal  text-96 tracking-[-0.4px] align-middle text-[#202435] ">
                    في المطبخ، بنشتغل بدقة وتركيز عشان يطلع الطعم ثابت في كل مرة
                    في التحضير، بنهتم بأدق التفاصيل وجودة الخامات في الخدمة،
                    بنحرص إن التعامل يكون محترم وسريع ويليق بثقة العميل مع مرور
                    السنين، قدرنا نكوّن منظومة شغل متكاملة قائمة على الالتزام،
                    والتعاون، وحب الشغل. وده اللي خلانا نقدر نكبر ونفتح فرعين من
                    غير ما نضحي بالجودة أو الروح اللي بدأنا بيها.
                  </p>
                </div>
              </div>
            </div>
            <div className="left-3.75">
              <p className="font-normal text-96 leading-6 tracking-[0%] align-middle text-[#202435]">
                نؤمن إن النجاح الحقيقي بيستمر لما يكون وراه فريق واحد بقلب واحد
                وإن كل ساندوتش بيطلع من عندنا هو نتيجة مجهود جماعي واشتغلنا عليه
                بإخلاص واحترام لذوق عملائنا.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default page;
