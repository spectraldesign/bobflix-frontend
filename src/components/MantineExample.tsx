import { Image } from "@mantine/core";

export default function MantineExample() {
    return (
        <div >
            <Image
                src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/226.png"
                alt="Mantine"
                width={400}
                height={400}
                radius="md"
                fit="contain"
                style={{ border: "1px solid white", borderRadius: "10px", backgroundColor: "rgba(2,2,2,0.4)" }}
            />
            <p>This is an example of an image component</p>
        </div>
    );
}