import { getTradeLabel } from './useActions';

describe('useAction getTradeLabel', () => {
  it('should return "Long Opened" when PositionOpened and size > 0', () => {
    const futuresTrade = {
      type: 'PositionOpened',
      size: '10',
      positionSize: '10',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Opened');
  });

  it('should return "Short Opened" when PositionOpened and size < 0', () => {
    const futuresTrade = {
      type: 'PositionOpened',
      size: '-10',
      positionSize: '-10',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Opened');
  });

  it('should return "Short Liquidated" when Liquidated and size > 0', () => {
    const futuresTrade = {
      type: 'Liquidated',
      size: '10',
      positionSize: '0',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Liquidated');
  });

  it('should return "Long Liquidated" when Liquidated and size < 0', () => {
    const futuresTrade = {
      type: 'Liquidated',
      size: '-10',
      positionSize: '0',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Liquidated');
  });

  it('should return "Short Closed" when PositionClosed and size > 0', () => {
    const futuresTrade = {
      type: 'PositionClosed',
      size: '10',
      positionSize: '0',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Closed');
  });

  it('should return "Long Closed" when PositionClosed and size < 0', () => {
    const futuresTrade = {
      type: 'PositionClosed',
      size: '-10',
      positionSize: '0',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Closed');
  });

  it('should return "Long Increased" when PositionModified and size > 0, positionBeforeTradeWasLong', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '5',
      positionSize: '15',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Increased');
  });

  it('should return "Short Increased" when PositionModified and size < 0, positionBeforeTradeWasShort', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '-5',
      positionSize: '-15',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Increased');
  });

  it('should return "Short Decreased" when PositionModified and size > 0, positionBeforeTradeWasShort', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '5',
      positionSize: '-5',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Decreased');
  });

  it('should return "Long Decreased" when PositionModified and size < 0, positionBeforeTradeWasLong', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '-5',
      positionSize: '5',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Decreased');
  });
  it('should return "Short Flipped To Long" when PositionModified and size > 0, positionBeforeTradeWasShort, positionIsLong', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '15',
      positionSize: '5',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Short Flipped To Long');
  });

  it('should return "Long Flipped To Short" when PositionModified and size < 0, positionBeforeTradeWasLong, positionIsShort', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '-15',
      positionSize: '-5',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Long Flipped To Short');
  });
  it('should return "Unexpected Action" when PositionModified and size = 0', () => {
    const futuresTrade = {
      type: 'PositionModified',
      size: '0',
      positionSize: '0',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Unexpected Action');
  });

  it('should return "Unexpected Action" when an unknown trade type is provided', () => {
    const futuresTrade = {
      type: 'UnknownType',
      size: '10',
      positionSize: '10',
    } as any;
    expect(getTradeLabel(futuresTrade)).toBe('Unexpected Action');
  });
});
