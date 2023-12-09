import { getTypeOfHand, rankHands } from './cards';

describe('getTypeOfHand', () => {
  it('should get type of hand', () => {
    expect(getTypeOfHand('AAAAA')).toEqual('five-of-a-kind');

    expect(getTypeOfHand('AAAA2')).toEqual('four-of-a-kind');
    expect(getTypeOfHand('AA8AA')).toEqual('four-of-a-kind');

    expect(getTypeOfHand('AAA22')).toEqual('full-house');
    expect(getTypeOfHand('23332')).toEqual('full-house');

    expect(getTypeOfHand('AAA32')).toEqual('three-of-a-kind');
    expect(getTypeOfHand('TTT98')).toEqual('three-of-a-kind');

    expect(getTypeOfHand('AA332')).toEqual('two-pair');
    expect(getTypeOfHand('23432')).toEqual('two-pair');

    expect(getTypeOfHand('AA432')).toEqual('one-pair');
    expect(getTypeOfHand('A23A4')).toEqual('one-pair');

    expect(getTypeOfHand('AKQJT')).toEqual('high-card');
    expect(getTypeOfHand('23456')).toEqual('high-card');
  });

  it('should rank hands', () => {
    const hands = [
      '23456',
      '23432',
      'A23A4',
      'TTT98',
      'AA8AA',
      'AAAAA',
      '23332',
    ];

    expect(rankHands(hands)).toEqual([
      'AAAAA',
      'AA8AA',
      '23332',
      'TTT98',
      '23432',
      'A23A4',
      '23456',
    ]);
  });

  it('should rank jokerfied hands', () => {
    const hands = ['32T3K', 'T55J5', 'KK677', 'KTJJT', 'QQQJA'];

    expect(rankHands(hands, true)).toEqual([
      'KTJJT',
      'QQQJA',
      'T55J5',
      'KK677',
      '32T3K',
    ]);
  });

  it('should break ties', () => {
    expect(rankHands(['KKKKK', 'AAAAA', 'QQQQQ'])).toEqual([
      'AAAAA',
      'KKKKK',
      'QQQQQ',
    ]);
    expect(rankHands(['AAAAT', 'AAAAK', 'AAAA2'])).toEqual([
      'AAAAK',
      'AAAAT',
      'AAAA2',
    ]);
    expect(rankHands(['KQJT5', 'KQJT7', 'KQJT9'])).toEqual([
      'KQJT9',
      'KQJT7',
      'KQJT5',
    ]);
    expect(rankHands(['2AAAA', '33332'])).toEqual(['33332', '2AAAA']);
    expect(rankHands(['77788', '77888'])).toEqual(['77888', '77788']);
  });
});
