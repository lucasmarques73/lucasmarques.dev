import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET(request: Request) {

    const { searchParams, origin } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title") : "Blog";

    const logoUrl = `${origin}/logo.png`
    const imageData = await fetch(new URL(logoUrl, import.meta.url)).then(
        (res) => res.arrayBuffer(),
    ) as string;

    const fontUrl = `${origin}/fonts/Inter-Bold.ttf`
    const fontData = await fetch(
        new URL(fontUrl, import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            // Modified based on https://tailwindui.com/components/marketing/sections/cta-sections
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'white',
                    fontWeight: 800
                }}
            >
                <div tw='flex flex-col justify-between p-10 h-full'>
                    <p tw='px-4 text-6xl'>{title}</p>


                    <img width="400" height="134" src={imageData} />
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            fonts: [
                {
                    name: "Inter",
                    data: fontData,
                    style: "normal",
                },
            ],
        },
    );
}