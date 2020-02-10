##' *create binomial distribution from data*
numbers <- rbinom(50, 50, 0.5)
numbers

##' *define binomial distribution function*
binomial_dist <- function(n,p,x) {
  temp_C <- (factorial(n) / (factorial(x) * factorial(n-x)))*(p^x)*((1-p)^(n-x))
  return(temp_C)
}

##' * find binomial densities*
binom_df<-NULL
for (i in 1:50){
  binom_df[i] <- binomial_dist(50,0.5,numbers[i])
}

##' *make it dataframe and plot binomial distribution*
full_df <- data.frame(numbers,binom_df)
plot(numbers,binom_df,type="h",main="Binom Distribution",ylab="Binomial Distributions of Values", xlab = "Number of Trials",col="blue")



##' *define beta function*
beta<-function(x,a,b){
  betaf<-(factorial(a+b)/(factorial(a)*factorial(b)))*(x^(a-1))*((1-x)^(b-1))
  return(betaf)
}

##' *plot beta distribution*
dist<- beta(binom_df,2,3)
plot(binom_df,dist,type="b",col="blue",main = paste("Beta (",2,",",3,")"),ylab="density")



##' *define beta prior function to binomial distribution get posterior densities*
beta_binom_prior <- function(x,a,b,n,p){
  betap<-(factorial(a+b+n)/(factorial(x+a)*factorial(n-x+b)))*(p^(x+a-1))*((1-p)^(n-x+b-1))
  return(betap)
}


##' *check out posterior distibution with beta prior for binomial data*
##' *that is conjugate family of priors*
x_post <- beta_binom_prior(binom_df,2,3,50,0.5)
plot(binom_df,x_post,type="b",col="blue",ylab="density",main = paste("Posterior of Binomial Data with Beta Prior(",2,",",3,")"))

##' *if we give beta prior for binomial data we get beta posterior, this is conjugate distribution.*



