/* eslint-disable testing-library/await-async-query */
import { act, create } from 'react-test-renderer';
import TuitStats from '../../src/components/tuits/tuit-stats';

test('dislike stat render correctly', () => {
    let stats = {
      likes: 10,
      dislikes: 10,
      replies: 10,
      retuits: 10,
    };

    let tuitStats;


    const dislikeTuit = () => {
        act(() => {
          stats.dislikes++;
          tuitStats.update(
            <TuitStats tuit={{ stats: stats }} dislikeTuit={() => {}} />
          );
        });
      };

      act(() => {
        tuitStats = create(
          <TuitStats
            dislikeTuit={dislikeTuit}
            tuit={{ stats: stats }}
          />
        );
      });

      const root = tuitStats.root;
      const dislikeData = root.findByProps({ className: 'dislike-number' });
      const dislikeButton = root.findByProps({className: 'dislike-button'});

      let dislikeNum = dislikeData.children[0];
      expect(dislikeNum).toBe('10');
    
      act(() => {
        dislikeButton.props.onClick();
      });
      dislikeNum = dislikeData.children[0];
      expect(dislikeNum).toBe('11');

    })