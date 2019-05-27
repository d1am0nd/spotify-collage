import {h, FunctionalComponent} from 'preact';
import {useState} from 'preact/hooks';
import {getToken, authLink} from '../init';
import Title from './Title';
import Footer from './Footer';
import SpotifyButton from './SpotifyButton';
import GenerateButton from './GenerateButton';
import Emphasis from './Emphasis';
import Collage from './Collage';
import {getTop, IArtist} from '../api';

const layoutStyle = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '600px',
};

const Layout: FunctionalComponent = () => {
  const token = getToken();
  const [artists, setArtists] = useState([]);
  const [img, setImg] = useState(undefined);

  return (
    <div style={layoutStyle}>
      <Title>Spotify collage generator</Title>
      <Emphasis>
        Generate a 3x3 collage of your favourite Spotify
        artists based on past <strong style={{fontWeight: 400}}>4 weeks</strong>
      </Emphasis>
      <p style={{fontSize: '1.1em'}}>
        Shoutouts to {` `}
        <a href='http://www.tapmusic.net/'>tapmusic.net</a>
      </p>

      <div style={{marginTop: '50px'}}>
        {
          token === undefined
            ? (
              <SpotifyButton to={authLink()}>
                Spotify login
              </SpotifyButton>
            )
            : artists.length === 0
              ? (
                <GenerateButton
                  handleClick={async (e) => {
                    e.preventDefault();
                    setArtists((await getTop(token, 9)).data.items);
                  }}>
                  Generate collage
                </GenerateButton>
              )
              : (
                <Collage artists={artists} />
              )
        }
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
