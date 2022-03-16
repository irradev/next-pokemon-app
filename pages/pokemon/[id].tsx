import { GetStaticProps, GetStaticPaths, NextPage } from 'next';

import { getPokemonInfo, strings } from '../../utils';
import { Layout } from '../../components/layouts';
import { PokemonInfo } from '../../components/pokemon';
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={strings.wordCapitalize(pokemon.name)}>
      <PokemonInfo pokemon={pokemon} />
    </Layout>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id },
    })),
    fallback: false,
  };
};

// paths: [
//   {
//     params: { id: '1' },
//   },
//   {
//     params: { id: '2' },
//   },
//   {
//     params: { id: '3' },
//   },
// ],
// fallback: 'blocking',

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
  };
};
