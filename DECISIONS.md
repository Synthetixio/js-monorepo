# Architectural Decision Records

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
