#!/usr/bin/env bash


static() {
  page=$1
  mkdir -p ./out/$page
  cp ./out/index.html ./out/$page/index.html
}

static 'staking/mint'
static 'staking/burn'
static 'staking/unflag'
static 'staking/swap-links'
static 'staking/self-liquidation'
static 'earn'
static 'wallet'
static 'terms'
static 'wallet/balances'
static 'loans'
static 'loans/new'
static 'loans/list'
static 'debt'
static 'debt/overview'
static 'debt/manage'
static 'debt/manage/buy'
static 'debt/manage/sell'
static 'migrate-escrow'
static 'escrow'
static 'escrow/rewards'
static 'escrow/ico'
static 'history'
static 'delegate'
static 'merge-accounts'
static 'bridge'

find ./out -name 'index.html'
