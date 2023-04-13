import {
  abi,
  PerpsV2MarketETHPERP,
} from '@synthetixio/contracts/build/goerli-ovm/deployment/PerpsV2MarketETHPERP.js';
import { address } from '@synthetixio/contracts/build/goerli-ovm/deployment/PerpsV2ProxyETHPERP';

import { Contract, providers } from 'ethers';

const provider = new providers.InfuraProvider(420, '8b1cbf82d4004d63acd4aa9829bc6d15');

const contract = new Contract(
  '0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c',
  abi,
  provider
) as PerpsV2MarketETHPERP;

const run = async () => {
  console.log(address);

  const positionModified = await contract.queryFilter(
    contract.filters.PositionModified(null, '0x3142840db87aC3102E874E8bD28a15E42e028145')
  );
  const fundingRecomputed = await contract.queryFilter(
    contract.filters.FundingRecomputed(),
    positionModified.at(0)?.blockNumber,
    positionModified.at(-1)?.blockNumber
  );
  const x = fundingRecomputed.at(0);
  const parsed = {
    funding: x?.args.funding.toString(),
    index: x?.args.index.toString(),
    fundingRate: x?.args.fundingRate.toString(),
    timestamp: x?.args.index.toString(),
  };

  console.log(parsed);
  console.log(fundingRecomputed.at(0));
  console.log(fundingRecomputed.at(1));
  console.log(fundingRecomputed.at(2));

  const code = positionModified
    // .slice(-numberOfEvents)
    // .filter((x) => x.logIndex === 10 || x.logIndex === 13)
    .map(({ args, logIndex, blockNumber, transactionHash }, i) => {
      const fundingForModify = fundingRecomputed.find((x) => x.args.index.eq(args.fundingIndex));
      if (!fundingForModify) {
        console.log(args.fundingIndex.toString());
        throw Error('Expected funding update for modify event');
      }
      // id: BigNumber { _hex: '0x00', _isBigNumber: true },
      // account: '0x3142840db87aC3102E874E8bD28a15E42e028145',
      // margin: BigNumber { _hex: '0x36345f47b314f0dd80', _isBigNumber: true },
      // size: BigNumber { _hex: '0x00', _isBigNumber: true },
      // tradeSize: BigNumber { _hex: '0x00', _isBigNumber: true },
      // lastPrice: BigNumber { _hex: '0x610f0a84f579550000', _isBigNumber: true },
      // fundingIndex: BigNumber { _hex: '0x0b17', _isBigNumber: true },
      // fee: BigNumber { _hex: '0x00', _isBigNumber: true },
      // skew: BigNumber { _hex: '0x111c6e3f2edcc5c3', _isBigNumber: true }

      return `
        
        handleFundingRecomputed(createFunctionRecomputedEvent(
          BigInt.fromString("${fundingForModify.args.funding.toString()}"), // funding
          BigInt.fromString("${fundingForModify.args.fundingRate.toString()}"), // fundingRate
          BigInt.fromString("${fundingForModify.args.index.toString()}"), // index
          BigInt.fromI32(15), // block timestamp
          10 // log index
        ));

      //Block number: ${blockNumber}
      // TX Hash: ${transactionHash}
    handlePositionModified(
      createPositionModifiedEvent(
        BigInt.fromI32(${args.id.toNumber()}),// id
        Address.fromString("${args.account}"),// account
        BigInt.fromString("${args.margin.toString()}"), // margin
        BigInt.fromString("${args.size.toString()}"), // size
        BigInt.fromString("${args.tradeSize.toString()}"),//tradeSize
        BigInt.fromString("${args.lastPrice.toString()}"),// last price
        BigInt.fromString("${args.fundingIndex.toString()}"),// fundingIndex
        BigInt.fromString("${args.fee.toString()}"),// fee
        ${i + 1},// timestamp
        BigInt.fromString("${args.skew.toString()}"), // skew,
        ${logIndex} // logIndex
        )
      )
    `;
    });
  console.log(code.join('\n'));
};
run();
