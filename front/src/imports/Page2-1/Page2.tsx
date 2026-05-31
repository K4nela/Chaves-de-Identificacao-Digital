import imgImage1 from "./9c55fdd14e50ccad73df75fee2fca27825a32e95.png";
import imgImage2 from "./88fce42ccce48bc944376567c97d6c5a3cd63812.png";
import imgImage7 from "./d843fdcc05eae03bc941afb6507e55fda63efc95.png";
import imgImage6 from "./0676aa78289f0dfa39673b39c7aad73327488194.png";
import imgImage8 from "./3faa663a158a6bca9188c78856b323f1bcedc0ea.png";
import imgAranhazinha1 from "./af99237d5b9215fdbb707f0733fd4377f9f33180.png";

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-1/2 overflow-clip px-[617px] py-[10px]">
      <p className="font-['Jaldi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-justify whitespace-nowrap">©GesKeys</p>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute h-[64px] left-[173px] top-[102px] w-[345px]" data-name="logo">
      <p className="-translate-x-1/2 absolute font-['JejuHallasan:Regular',sans-serif] leading-[normal] left-1/2 not-italic text-[#798e3f] text-[64px] text-center top-[calc(50%-32px)] w-[345px]">GuessKeys</p>
    </div>
  );
}

function Img() {
  return (
    <div className="h-[229px] overflow-clip relative shrink-0 w-[183px]" data-name="img10">
      <div className="absolute aspect-[183/229] left-0 right-0 top-0" data-name="image 10">
        <div className="absolute inset-0 pointer-events-none rounded-[50px]" data-name="image 1">
          <div className="absolute inset-0 overflow-hidden rounded-[50px]">
            <img alt="" className="absolute left-[0.02%] max-w-none size-[99.95%] top-[0.38%]" src={imgImage1} />
          </div>
          <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
        </div>
      </div>
    </div>
  );
}

function Img1() {
  return (
    <div className="h-[229px] overflow-clip relative shrink-0 w-[215px]" data-name="img12">
      <div className="absolute aspect-[231/246] left-0 right-0 top-0" data-name="image 12">
        <div className="absolute inset-0 pointer-events-none rounded-[50px]" data-name="image 2">
          <div className="absolute inset-0 overflow-hidden rounded-[50px]">
            <img alt="" className="absolute h-[108.67%] left-[-4.6%] max-w-none top-[-0.09%] w-[108.69%]" src={imgImage2} />
          </div>
          <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
        </div>
      </div>
    </div>
  );
}

function ImgChave() {
  return (
    <div className="absolute content-stretch flex gap-[10px] inset-0 items-start overflow-clip p-[10px]" data-name="imgChave_1">
      <Img />
      <Img1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0">
      <ImgChave />
    </div>
  );
}

function ImgChave1() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="imgChave_3">
      <div className="absolute inset-0 pointer-events-none rounded-[50px]" data-name="image 8">
        <div className="absolute inset-0 overflow-hidden rounded-[50px]">
          <img alt="" className="absolute h-full left-[-0.04%] max-w-none top-0 w-[100.09%]" src={imgImage7} />
        </div>
        <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
      </div>
    </div>
  );
}

function ImgChave2() {
  return (
    <div className="absolute inset-0 overflow-clip" data-name="imgChave_4">
      <div className="absolute inset-0 pointer-events-none rounded-[50px]" data-name="image 8">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[50px] size-full" src={imgImage8} />
        <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[433px] left-[calc(50%+0.5px)] overflow-x-clip overflow-y-auto top-[calc(50%+103.5px)] w-[935px]">
      <div className="absolute h-[64px] left-0 top-0 w-[345px]" data-name="logo" />
      <div className="absolute content-stretch flex flex-col gap-[50px] h-[1856px] items-start left-[9px] p-[10px] top-0 w-[935px]" data-name="ultimaTela">
        <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="nivel1_historico">
          <div className="h-[249px] relative shrink-0 w-[428px]" data-name="imgChave_1">
            <Group />
          </div>
        </div>
        <div className="h-[231px] overflow-clip relative shrink-0 w-[442px]" data-name="nivel2_historico">
          <div className="absolute h-[231px] left-0 pointer-events-none top-0 w-[442px]" data-name="imgChave2">
            <div className="absolute inset-[0_0_0_48.42%] rounded-[50px]" data-name="image 7">
              <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[50px] size-full" src={imgImage7} />
              <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
            </div>
            <div className="absolute inset-[0_54.3%_1.3%_0] rounded-[50px]" data-name="image 6">
              <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[50px] size-full" src={imgImage6} />
              <div aria-hidden="true" className="absolute border-5 border-[#798e3f] border-solid inset-0 rounded-[50px]" />
            </div>
          </div>
        </div>
        <div className="h-[231px] overflow-clip relative shrink-0 w-[228px]" data-name="nivel3_historico">
          <div className="absolute h-[231px] left-0 top-0 w-[228px]" data-name="imgChave3">
            <ImgChave1 />
          </div>
        </div>
        <div className="h-[129px] overflow-clip relative shrink-0 w-[339px]" data-name="nivel3_historico">
          <div className="absolute h-[129px] left-0 top-0 w-[339px]" data-name="imgChave4">
            <ImgChave2 />
          </div>
        </div>
        <div className="flex-[1_0_0] min-h-px min-w-px overflow-x-clip overflow-y-auto relative rounded-[20px] shadow-[4px_4px_4px_0px_rgba(0,0,0,0.25)] w-[915px]" data-name="img">
          <div className="absolute h-[3277px] left-[-1943px] top-[-1536px] w-[4096px]" data-name="aranhazinha 1">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img alt="" className="absolute left-[46.56%] max-w-none size-[23.83%] top-[43.72%]" src={imgAranhazinha1} />
            </div>
          </div>
        </div>
        <div className="content-stretch flex gap-[30px] items-center justify-center overflow-clip px-[30px] py-[10px] relative shrink-0 w-[915px]">
          <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
            <div className="-scale-y-100 flex-none rotate-180 w-full">
              <div className="h-[40px] overflow-clip relative rounded-[10px] w-full" data-name="epecie!">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute flex items-center justify-center left-[calc(50%-0.5px)] top-1/2">
                  <div className="-scale-y-100 flex-none rotate-180">
                    <div className="flex flex-col font-['JejuHallasan:Regular',sans-serif] justify-center leading-[0] not-italic relative text-[#798e3f] text-[28px] text-center whitespace-nowrap">
                      <p className="leading-[normal] whitespace-pre">{`MYGALOMORPHAE  `}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="cursor-pointer max-w-[935px] relative rounded-[10px] shrink-0 w-[935px]" data-name="descrição">
          <div className="content-stretch flex flex-col items-center justify-center max-w-[inherit] overflow-clip p-[10px] relative rounded-[inherit] w-full">
            <div className="h-[125px] relative shrink-0 w-full">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center p-[10px] relative size-full">
                  <p className="flex-[1_0_0] font-['Jaldi:Regular',sans-serif] h-full leading-[normal] min-h-px min-w-px not-italic relative text-[20px] text-black text-justify">Mygalomorphae é uma infraordem de aranhas caracterizada por suas presas que se movem verticalmente, como punhais, em contraste com o movimento cruzado das aranhas araneomorfas. Inclui tarântulas, aranhas-armadeiras australianas e aranhas-de-alçapão, entre outras espécies grandes e de vida geralmente subterrânea.</p>
                </div>
              </div>
            </div>
          </div>
          <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]" />
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="bg-white relative size-full" data-name="page2">
      <Frame1 />
      <Logo />
      <Frame />
    </div>
  );
}