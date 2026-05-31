import svgPaths from "./svg-oqlsns0nqt";

function Frame1() {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 content-stretch flex items-center justify-center left-1/2 overflow-clip px-[617px] py-[10px]">
      <p className="font-['Jaldi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[12px] text-[rgba(0,0,0,0.5)] text-justify whitespace-nowrap">©GesKeys</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="col-1 justify-self-stretch relative rounded-[10px] row-1 self-start shrink-0">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[__minmax(0,1fr)_40px] grid-rows-[repeat(1,fit-content(100%))] px-[10px] py-[5px] relative w-full">
          <div className="col-1 content-stretch flex items-center justify-center justify-self-start px-[5px] relative row-1 self-start shrink-0" data-name="StringPlaceholder">
            <p className="font-['Jaldi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-[rgba(0,0,0,0.5)] text-center whitespace-nowrap">Selecione a classe</p>
          </div>
          <button className="block col-2 cursor-pointer h-[21px] overflow-clip relative row-1 shrink-0 w-[10px]" data-name="seta">
            <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[17px] left-1/2 top-[calc(50%-0.5px)] w-[10px]" data-name="Vector">
              <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 17">
                <path clipRule="evenodd" d={svgPaths.p2276d900} fill="var(--fill-0, black)" fillOpacity="0.5" fillRule="evenodd" id="Vector" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0.5)] border-solid inset-[-2px] pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="gap-x-[10px] gap-y-[10px] grid grid-cols-[repeat(1,minmax(0,1fr))] grid-rows-[repeat(1,fit-content(100%))] p-[10px] relative w-full">
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="content-stretch flex flex-col items-start p-[10px] relative w-full">
          <div className="relative shrink-0 w-full" data-name="pesquisa">
            <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
              <div className="content-stretch flex flex-col items-center justify-center p-[10px] relative w-full">
                <Frame2 />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-center justify-center px-[10px] py-[30px] relative w-full">
          <div className="content-stretch flex flex-col h-[64px] items-center justify-center overflow-clip px-[30px] py-[5px] relative rounded-[10px] shrink-0 w-[165px]" data-name="botaoConcluir">
            <p className="font-['Jaldi:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[20px] text-[rgba(255,255,255,0)] text-justify whitespace-nowrap">Concluír</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[30px] h-[461px] items-start left-[calc(50%+0.5px)] overflow-x-clip overflow-y-auto top-[calc(50%+89.5px)] w-[935px]">
      <Frame6 />
      <div className="h-[143px] shrink-0 w-[935px]" />
      <Frame7 />
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

export default function Page() {
  return (
    <div className="bg-white relative size-full" data-name="page2">
      <Frame1 />
      <Frame />
      <Logo />
    </div>
  );
}