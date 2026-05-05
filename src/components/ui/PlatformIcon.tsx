import React from "react"

const B = "https://www.figma.com/api/mcp/asset/"

type Layer = { outer: string; inner: string; id: string }
type IconDef = { layers: Layer[] } | { render: () => React.ReactNode }

const ICONS: Record<string, IconDef> = {
  Home: {
    layers: [
      { outer: "inset-[10.42%_8.33%_56.25%_8.33%]", inner: "inset-[-12.5%_-5%]", id: "863649f7-9409-4c59-aa92-6a8647b838a1" },
      { outer: "inset-[39.58%_14.58%_10.42%_14.58%]", inner: "inset-[-8.33%_-5.88%]", id: "be1ec444-8cc4-478d-aeae-df943c0f4e15" },
    ],
  },
  Sidebar: {
    layers: [
      { outer: "inset-[12.5%_8.33%]", inner: "inset-[-5.56%_-5%]", id: "55b847f3-8548-475d-958e-242af246bd69" },
      { outer: "inset-[12.5%_60.42%_12.5%_39.58%]", inner: "inset-[0_-0.67px]", id: "720a7dfe-df81-41a3-87e4-ed4f7e36d33b" },
      { outer: "bottom-[58.33%] left-[20.83%] right-3/4 top-[29.17%]", inner: "inset-[-33.33%_-100%]", id: "babc7080-3d47-4d5f-b117-0773a442bcb7" },
    ],
  },
  Video: {
    layers: [
      { outer: "bottom-[8.33%] left-[8.33%] right-[8.33%] top-1/4", inner: "inset-[-6.25%_-5%]", id: "a4796af7-ba49-402e-88be-c3a4a20111fc" },
      { outer: "bottom-3/4 left-[37.5%] right-[33.33%] top-[8.33%]", inner: "inset-[-25%_-14.29%]", id: "9dbe2ddb-3653-428c-8cd0-aa858c97972a" },
    ],
  },
  Audio: {
    layers: [
      { outer: "bottom-[16.67%] left-[70.83%] right-[8.33%] top-1/2", inner: "inset-[-12.5%_-20%_-12.5%_-20.01%]", id: "feadc07d-ce40-4368-b65d-22f43b303707" },
      { outer: "inset-[87.5%_39.58%_8.33%_39.58%]", inner: "inset-[-100%_-20%]", id: "0d981f1e-995a-4817-bbdc-5ec2e2d2f641" },
      { outer: "bottom-[16.67%] left-[8.33%] right-[70.83%] top-1/2", inner: "inset-[-12.5%_-20%]", id: "63fa2677-19cf-4f04-b081-5879220a62f4" },
      { outer: "inset-[8.33%_8.33%_33.33%_8.33%]", inner: "inset-[-7.14%_-5%]", id: "9d7ca565-4974-43fe-a360-e88b0c542f1b" },
    ],
  },
  Document: {
    layers: [
      { outer: "inset-[12.5%_16.67%_12.5%_8.33%]", inner: "inset-[-5%_-6.25%]", id: "96a1adba-e5e4-46ae-96d9-84cfe0555d80" },
      { outer: "bottom-[66.67%] left-1/4 right-[41.67%] top-[33.33%]", inner: "inset-[-0.67px_-12.5%]", id: "a55b0111-10a2-4ea1-9755-58b029b242d2" },
      { outer: "bottom-1/2 left-1/4 right-[41.67%] top-1/2", inner: "inset-[-0.67px_-12.5%]", id: "a55b0111-10a2-4ea1-9755-58b029b242d2" },
      { outer: "bottom-[33.33%] left-1/4 right-[58.33%] top-[66.67%]", inner: "inset-[-0.67px_-25%]", id: "089df9b3-07fe-4a01-ae83-84ce35872488" },
      { outer: "bottom-[12.5%] left-3/4 right-[8.33%] top-[33.33%]", inner: "inset-[-7.69%_-25%]", id: "087a86fd-adb5-44d0-beca-ddc5805988ae" },
    ],
  },
  Vision: {
    layers: [
      { outer: "inset-[29.17%_29.17%_12.5%_12.5%]", inner: "inset-[-7.14%]", id: "967eb027-9b46-4c84-b2c3-c3096a919ff5" },
      { outer: "inset-[12.5%_12.5%_62.5%_62.5%]", inner: "inset-[-16.67%]", id: "ed9e0438-ffc2-4b46-9f28-6a51c9e6cb64" },
    ],
  },
  Speech: {
    layers: [
      { outer: "inset-[8.33%_29.17%_33.33%_29.17%]", inner: "inset-[-7.14%_-10%]", id: "dc14ddab-b5d8-4235-ad85-946c78662e37" },
      { outer: "inset-[45.83%_16.67%_8.33%_16.67%]", inner: "inset-[-9.09%_-6.25%]", id: "9abedce1-9ca3-43c5-9946-1ca63a0eedf5" },
    ],
  },
  Chats: {
    layers: [
      { outer: "inset-[8.33%_16.67%_16.67%_8.33%]", inner: "inset-[-5.56%]", id: "e84a56d5-a60b-40f5-860a-ec8c92115eb4" },
      { outer: "inset-[45.83%_8.33%_8.33%_45.83%]", inner: "inset-[-9.09%]", id: "6f10cb35-b441-439b-875a-fb73a0fcaaa6" },
    ],
  },
  Translate: {
    layers: [
      { outer: "inset-[8.33%_29.17%_66.67%_8.33%]", inner: "inset-[-16.67%_-6.68%_-16.67%_-6.67%]", id: "576e5d81-2a8b-4c96-8d3e-5d1eeca34e92" },
      { outer: "inset-[66.67%_8.33%_8.33%_29.17%]", inner: "inset-[-16.67%_-6.67%_-16.67%_-6.68%]", id: "3b8cfada-ac86-4fc8-b3d6-5956a16078a5" },
      { outer: "inset-[39.58%_20.83%_39.58%_62.5%]", inner: "inset-[-20%_-25%]", id: "befa9aca-f345-48ee-941f-adfb5fe20c95" },
      { outer: "inset-[39.58%_66.67%_39.58%_12.5%]", inner: "inset-[-20%]", id: "dab8232b-0ef5-4117-92b5-87219b77d8ba" },
      { outer: "bottom-1/2 left-[45.83%] right-1/2 top-1/2", inner: "inset-[-0.67px_-100%]", id: "39097982-3b51-4749-8c85-c4d92ce4894e" },
    ],
  },
  Conversions: {
    layers: [
      { outer: "inset-[8.33%_12.5%_52.08%_12.5%]", inner: "inset-[-10.53%_-5.56%]", id: "4a2d15fa-27f5-4cb6-b687-9393f6f4630a" },
      { outer: "inset-[46.24%_12.5%_31.61%_12.5%]", inner: "inset-[-18.81%_-5.56%]", id: "4205d73e-6cc7-45ce-96db-de95f7786f7d" },
      { outer: "inset-[67.78%_12.5%_8.33%_12.5%]", inner: "inset-[-17.44%_-5.56%]", id: "14e7ec00-3283-4ec1-9964-08b1fce0933c" },
    ],
  },
  Key: {
    layers: [
      { outer: "inset-[10.42%]", inner: "inset-[-5.26%]", id: "75bf91ef-5ed8-43ae-852c-fd0344fb8c8c" },
      { outer: "inset-[27.08%_27.08%_68.75%_68.75%]", inner: "inset-[-100%]", id: "7f4797cf-d9d9-4fd9-8d5a-8d5eb9960941" },
    ],
  },
  Usage: {
    layers: [
      { outer: "inset-[14.58%_14.58%_10.42%_10.42%]", inner: "inset-[-5.56%_-5.56%_-5.56%_-5.55%]", id: "527d0a39-3cc5-49ab-afe6-4a775d77fc7d" },
      { outer: "inset-[10.42%_10.42%_47.92%_47.92%]", inner: "inset-[-10%]", id: "402ffb70-b8f5-42f3-83b9-b85f78ba502e" },
    ],
  },
  Limits: {
    layers: [
      { outer: "inset-[10.42%_10.42%_72.92%_72.92%]", inner: "inset-[-25%]", id: "afe5e5fd-2f83-42bf-8ce5-25ca4bdc1e7f" },
      { outer: "inset-[14.58%_14.58%_10.42%_10.42%]", inner: "inset-[-5.56%]", id: "927e47a2-ef05-42d3-aa21-927c0cf14f5d" },
      { outer: "inset-[35.42%_27.08%_31.25%_22.92%]", inner: "inset-[-12.5%_-8.33%]", id: "9059dc0b-9cba-4345-b761-4178c91c4466" },
    ],
  },
  Billings: {
    layers: [
      { outer: "inset-[8.33%_16.67%]", inner: "inset-[-5%_-6.25%]", id: "bd48cdcb-f70e-4ebd-8270-124a3f9bc38c" },
      { outer: "inset-[45.83%_54.17%_54.17%_33.33%]", inner: "inset-[-0.67px_-33.33%]", id: "2c7c56a6-f33d-4c26-bc60-05998b49a0c1" },
      { outer: "inset-[29.17%_41.67%_70.83%_33.33%]", inner: "inset-[-0.67px_-16.67%]", id: "2e8c6e17-73a2-4044-9346-155eb902f755" },
    ],
  },
  Pricing: {
    layers: [
      { outer: "inset-[35.42%_12.5%_10.42%_12.5%]", inner: "inset-[-7.69%_-5.56%]", id: "8187cc3c-bcb3-4bfc-8629-277e93987c14" },
      { outer: "inset-[10.42%_37.5%_64.59%_12.5%]", inner: "inset-[-16.67%_-8.33%]", id: "69cb0d1b-0d20-4aa3-93ab-5e143fb0eb5f" },
      { outer: "bottom-[35.42%] left-[70.83%] right-1/4 top-[60.42%]", inner: "inset-[-100%]", id: "5c11a810-2638-419d-acce-3473eacbffdb" },
    ],
  },
  Sarvam: {
    layers: [
      { outer: "bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]", inner: "inset-[-16.67%_-8.33%]", id: "e1a2631a-1fd0-4bc9-804b-4ddef1f1ca92" },
    ],
  },
  TextToSpeech: {
    render: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#tts-clip)">
          <path d="M7.28592 12H4.71449M6 4V11.9997M6 4C6.5946 4 7.35836 4.01357 7.96646 4.07843C8.22364 4.10585 8.35226 4.11957 8.46604 4.16794C8.70283 4.26855 8.89363 4.48912 8.96546 4.74518C9 4.86829 9 5.00877 9 5.28974M6 4C5.4054 4 4.64163 4.01357 4.03355 4.07843C3.77636 4.10585 3.64776 4.11957 3.53394 4.16794C3.29719 4.26855 3.10635 4.48912 3.03453 4.74518C3 4.86829 3 5.00877 3 5.28974" stroke="currentColor" strokeLinecap="round"/>
          <path d="M11.3954 0.529852C13.3891 1.09089 14.5504 3.16186 13.9894 5.1555M10.7182 2.9364C11.3827 3.12341 11.7698 3.81373 11.5828 4.47828" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round"/>
        </g>
        <defs>
          <clipPath id="tts-clip">
            <rect width="16" height="16" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    ),
  },
}

export type IconName = keyof typeof ICONS

export function PlatformIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const icon = ICONS[name]

  if ("render" in icon) {
    return <>{icon.render()}</>
  }

  return (
    <div className={className ?? "overflow-clip relative size-4"}>
      {icon.layers.map((layer, i) => (
        <div key={i} className={`absolute ${layer.outer}`}>
          <div className={`absolute ${layer.inner}`}>
            <img alt="" className="block max-w-none size-full" src={`${B}${layer.id}`} />
          </div>
        </div>
      ))}
    </div>
  )
}
