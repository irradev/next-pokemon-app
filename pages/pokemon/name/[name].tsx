import { NextPage, GetStaticPaths, GetStaticProps } from 'next';

import { getPokemonInfo, strings } from '../../../utils';
import { pokeAPi } from '../../../api';
import { Layout } from '../../../components/layouts';
import { PokemonInfo } from '../../../components/pokemon';
import { Pokemon, PokemonListResponse } from '../../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={strings.wordCapitalize(pokemon.name)}>
      <PokemonInfo pokemon={pokemon} />
    </Layout>
  );
};

export default PokemonByNamePage;

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeAPi.get<PokemonListResponse>('/pokemon?limit=151');

  return {
    paths: data.results.map((pokemon) => ({
      params: { name: pokemon.name },
    })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400,
  };
};
