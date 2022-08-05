# Architectural Decision Records

## 2022-06-30 Independent versioning of packages

- This way we can consolidate more UI libs in the monorepo and maintain semver for them.
- We will no longer republish all `@synthetixio/*` libs together with synthetix release (so versions will no longer match).
- We will only update and release ones that directly or indirectly depend on it. Example is in the [README.md](README.md).
- Github actions will have 2 separate publishing flows:
  - to update all pakcages based on desired `synthetix` version
  - to update and publish one single package (and all that depend on it) by name

## 2022-06-09 Incorporate `codegen-graph-ts`

- Because `codegen-graph-ts` depends on `wei` and `queries` depend on `codegen-graph-ts` we ended up having multiple `wei` instances of different versions in the lockfile
- Adding package to the monorepo is a 3-step process. See details in the [README.md](README.md)

## 2022-06-02 Migrate to Yarn from NPM Workspaces

- As it turns out NPM workspaces do not have a lot of features
- Non-trivial to find all the workspaces in the monorepo (not too problematic)
- NPM keeps all deps in a non-flat tree structure, so it is pretty hard to work with when checking dependencies for version mismatches
- The biggest problem is publishing new versions as NPM does not update workspaces with new versions automatically, to deal with it, we would require some extra 3rd party tooling
- Yarn Berry (v3) resolves all the issues above
- Yarn comes with a possibility of zero installs if we opt in to keep packages cache in git

## 2022-05-27 Migrate to NPM Workspaces from Lerna

- Lerna is outdated and not supported
- It enforces us to maintain a single version for all packages
- Requires bootstrapping on top of initial installation
- Choosing NPM workspaces as the "npm by default" choice
