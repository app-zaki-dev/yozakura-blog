import Head from "next/head";
import { config } from "@/config/site.config";

export default function PageSEO(props) {
    const { title, description } = props;
    return (
        <Head>
            <title>
                {title
                    ? title + " | " + config.siteMeta.title
                    : config.siteMeta.title}
            </title>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content={description} />
            <link rel={config.siteMeta.rel} href={config.siteMeta.icon} />
        </Head>
    );
}
