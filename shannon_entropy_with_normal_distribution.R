library(plyr)

##' **create random discrete variables and plot it**
discrete_normal_arr <- round(rnorm(1000, 500, 10), 0)
hist(discrete_normal_arr, prob=TRUE, ylim=c(0,.06), breaks=10)
curve(dnorm(x, mean(discrete_normal_arr), sd(discrete_normal_arr)), add=TRUE, col="darkblue", lwd=2)

##' **define shannon entropy**
shannon_entropy <- function(x){
    df = count(x)
    df$probs = df$freq / length(df)
    for (i in 1:nrow(df)){
      se<- -sum(df$probs[i] * log(df$probs[i]))
      return(se)
    }
}


##' **play it**
shannon_entropy(discrete_normal_arr)
